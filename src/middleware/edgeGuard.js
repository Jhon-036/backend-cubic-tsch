
export function edgeGuard (req, res, next) {
  const h = req.get('x-edge-secret')

  if(!h || h !== process.env.EDGE_SHARED_SECRET_KEY) {
    return res.status(403).json({ message: 'Acceso denegado'})
  }

  next()
}