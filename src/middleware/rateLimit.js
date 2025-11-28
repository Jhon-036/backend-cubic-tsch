// midleware para limitar solicitudes HTTP

import rateLimit from 'express-rate-limit'

export const limit = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 550, // permitir solo 100 solicitudes por cada 15 minutos
  message: 'Demasiadas solicitudes, inténtalo de nuevo más tarde.' // mensaje de respuesta
})