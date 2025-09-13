import cloudinary from "../config/cloudinary.js"
import Product from "../models/ProductsModel.js"

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).send(products)
  } catch (err) {
    res.status(400).send('Error al obtener los productos')
    console.error('> Error al obtener los productos', err)
  }
}

export const getProduct = async (req, res) => {
  try {
    // obtenemos el id del front
    const { id } = req.params
    // enviamos el producto con el id
    const product = await Product.findById(id)
    // validamos producto
    if (!product) {
      return res.status(400).send('El producto no existe')
    }
    // declaramos mensaje de salida y estado http
    res.status(200).send(product)
  } catch (err) {
    res.status(400).send('Error al obtener el producto')
    console.error('> Error al obtener el producto', err)
  }
}

export const createProduct = async (req, res) => {
  try {
    // obtenemos la data del front
    const { name, description, category } = req.body
    // validamos campos vacios
    if (!name || !description || !category) {
      return res.status(400).send('Datos incompletos')
    }
    // declaramos nueva schema de Product con url de cloudinaty
    const product = new Product({
      name, 
      description, 
      category,
      image: req.file.path, // source_url
      imagePublicId: req.file.filename // public_id (products/name_file)
    })
    // guardamos la schema a la db
    await product.save()
    // declaramos mensaje de salida y estado http
    res.status(200).json({messaje: 'Producto creado', product: product})
  } catch (err) {
    res.status(400).send('Error al crear el producto')
    console.error('> Error al crear el producto', err)
  }
}

export const updateProduct = async (req, res) => {
  try {
    // obtenemos el id
    const { id } = req.params
    // actualizamos el producto
    const product = await Product.findById(id)
    if (!product) {
      return res.status(400).send('Producto no encontrado')
    }
    // preparamos la data
    const data = {...req.body}
    // si viene una imagen
    if (req.file) {
      // borrar la imagen anterior de cloudinary
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId)
      }
      //guardamos la info
      data.image = req.file.path,   // secure_url
      data.imagePublicId = req.file.filename  // public_id
    }
    const productUpdated = await Product.findByIdAndUpdate(id, data)
    res.status(200).json({message:'Producto actualizado', product: productUpdated})
  } catch (err) {
    res.status(400).send('Error al actualizar el producto')
    console.error('> Error al actualizar el producto', err)
  }
}

export const deleteProduct = async (req, res) => {
  try {
    // obtenemos el id
    const { id } = req.params
    // eliminamos el product
    const product = await Product.findById(id)
    // validamos el producto a eliminar
    if (!product) {
      return res.status(400).send('El producto no existe')
    }
    // validamos si exite el imagePublicId
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId)
    }
    // eliminamos el producto
    const productDeleted = await Product.findByIdAndDelete(id)
    res.status(200).json({ message: "Producto eliminado", producto: productDeleted })
  } catch (err) {
    res.status(400).send('Error al eliminar el producto')
    console.error('> Error al el producto', err)
  }
}