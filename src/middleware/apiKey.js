// middleware para proteger de dominios y terceros sin el header correcto

export function apiKey (req, res, next) {
  const apiKey = req.headers['authorization'] // 'Bearer <API_KEY>'

  if (!apiKey || apiKey !== `Bearer ${process.env.API_KEY}`) {
    return res.status(403).json({message: 'No autorizado'})
  }

  next()
}