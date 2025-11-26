import jwt from 'jsonwebtoken'

export function AuthJwt(req, res, next) {
  try {
    const header = req.headers.authorization 

    const token = header.split(' ')[1]
    if (!token) {
      return res.status(401).json({error: 'Debe de iniciar sesión'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    
    next()

  } catch (err) {
    console.log('> Error en AuthJwt: ', err.message)
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Sesión caducado' })
    }
    return res.status(400).json({ error: 'Error al autenticarse'})
  }
}