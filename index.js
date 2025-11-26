import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/database.js'
import router from './src/routers/routes.js'
import { corsConfig } from './src/middleware/corsConfig.js'
import { limit } from './src/middleware/rateLimit.js'

const app = express()
dotenv.config()

// uso de middleware global
app.use(express.json())
app.use(corsConfig)
app.use(limit)
app.use('/api/v1', router)

const PORT = process.env.PORT
if (!PORT) {
  console.log('> Puerto no definido ')
}

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log('> Servidor lanzado en el puerto', PORT)
    })
  } catch (err) {
    console.error('> Error al lanzar el servidor', err)
  }
}

startServer()