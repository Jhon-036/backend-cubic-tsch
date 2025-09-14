// middleware para proteger el consumo del backend

export function edgeGuard (req, res, next) {
  // declaramos h x-edge-secret
  const h = req.get('x-edge-secret')

  // si no no existe o no son iguales
  if(!h || h !== process.env.EDGE_SHARED_SECRET_KEY) {
    // retorna error 403 con mensaje
    return res.status(403).json({ message: 'Hey! No hagas esto, es confidencial!', atte: 'Jhon Daivd'})
  }

  next()
}