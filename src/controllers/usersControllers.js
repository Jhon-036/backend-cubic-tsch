import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
  try {
    const { name, username, password, rol } = req.body
    if (!name || !username || !password || !rol) {
      return res.status(400).json({ message: 'Los campos en blanco son obligatorios' })
    }

    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }
    
    if (password.length <= 6) {
      return res.status(400).json({ error: 'La contraseña debe de tener al menos 7 caracteres' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      rol
    })

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', user })

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: 'Los campos en blanco son obligatorios' })
    }

    const existingUsername = await User.findOne({ username }) 
    if (!existingUsername) {
      return res.status(400).json({ message: 'El usuario no existe' })
    }

    const existingPassword = await bcrypt.compare(password, existingUsername.password)
    if (!existingPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { id: existingUsername._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(201).json({ mensaje: 'Usuario logeado exitosamente', token, user: existingUsername })
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message })
  }
}