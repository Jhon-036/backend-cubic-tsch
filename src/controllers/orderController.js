import Order from '../models/ordersModel.js'

export const createOrder = async (req, res) => {
  try {
    const ip = (req.headers['x-forwarded-for'] || req.ip || '').split(',')[0].trim()
    const { name, lastname, email, telefono, rucodni, item } = req.body

    if (!name || !lastname || !email || !telefono || !rucodni || !item) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" })
    }

    const order = new Order({
      name,
      lastname,
      email,
      telefono,
      rucodni,
      item,
      ip
    })

    await order.save()

    return res.status(200).json({message: 'Orden creada correctamente', order})
  } catch (err) {
    console.log('Error al crear orden: ', err)
    return res.status(500).send('Error al crear la orden')
  }
}

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.status(200).json(orders)
  } catch (err) {
    console.log('Error al obtener ordenes: ', err)
    res.status(500).send('Error al obtener las órdenes')
  }
}

export const getMonthlyOrdersStats = async (req, res) => {
  try {
    const today = new Date()

    // 1. Primer día del mes actual (ej: 2025-11-01 00:00:00)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    // 2. Usaremos "hoy" como límite superior
    const end = today

    // 3. Agregación en Mongo
    const stats = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: end
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])

    // 4. Pasar a mapa para rellenar días sin órdenes
    const statsMap = {}
    stats.forEach(s => {
      statsMap[s._id] = s.totalOrders
    })

    // 5. Rellenar día por día desde el 1 del mes hasta hoy
    const result = []
    const cursor = new Date(startOfMonth)

    while (cursor <= end) {
      const key = cursor.toISOString().slice(0, 10) // "YYYY-MM-DD"

      result.push({
        date: key,
        totalOrders: statsMap[key] || 0  // si no hubo órdenes ese día → 0
      })

      cursor.setDate(cursor.getDate() + 1)
    }

    return res.status(200).json(result)
  } catch (err) {
    console.error("> Error al obtener estadísticas mensuales", err)
    return res.status(500).send("Error al obtener estadísticas mensuales")
  }
}

