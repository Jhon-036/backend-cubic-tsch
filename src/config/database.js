import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI
    if (!mongoURL) {
      console.log('> mongoURL no definido')
    }

    await mongoose.connect(mongoURL)
    console.log('> Conectado a la Base de Datos')
  } catch (err) {
    console.log('> Error al conectarse a la DB', err)
  }
}

export default connectDB