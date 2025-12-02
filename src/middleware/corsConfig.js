import cors from 'cors'

export const corsConfig = cors({
  origin: ['https://tschperu.com', 'https://cubic.tschperu.com', 'https://cubic-tsch.vercel.app'], // dominio 'http://localhost:5173', 'http://localhost:5174',
  methods: ['GET', 'PUT', 'POST', 'DELETE'], // metodo permitido
  allowedHeaders: ["Content-Type", "Authorization"], // Permite contenido en el body (application/json, multipart/form-data, etc.)
  credentials: false, // Permite cookies
  // allowedHeaders: ["Authorization"] Permite que envíe tokens en el header (ej: Authorization: Bearer <JWT>)
})