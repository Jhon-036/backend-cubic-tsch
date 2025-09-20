// middleware para permitir el consumo del back solo un dominio en específico

import cors from 'cors'

export const corsConfig = cors({
  origin: ['https://tschperu.com', 'http://localhost:5173'], // dominio
  methods: ['GET'], // metodo permitido
  allowedHeaders: ["Content-Type","Authorization"], // Permite contenido en el body (application/json, multipart/form-data, etc.)
  credentials: false // Permite cookies
  // allowedHeaders: ["Authorization"] Permite que envíe tokens en el header (ej: Authorization: Bearer <JWT>)
})