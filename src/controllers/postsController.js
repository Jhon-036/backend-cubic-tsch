import cloudinary from "../config/cloudinary.js"
import Post from "../models/postsModel.js"

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).send(posts)
  } catch (err) {
    res.status(400).send('Error al obtener las publicaciones')
    console.error('> Error al obtener las publicaciones', err)
  }
}

export const getPost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
      return res.status(400).send('La publicación no existe')
    }
    res.status(200).send(post)
  } catch (err) {
    res.status(400).send('Error al obtener la publicación')
    console.error('> Error al obtener la publicación', err)
  }
}

export const createPost = async (req, res) => {
  try {
    // obtenemos la data del front
    const { title, category, resume, fullContent } = req.body
    // validamos campos vacios
    if (!title || !category || !resume || !fullContent) {
      return res.status(404).send('Todos los campos son obligatorios')
    }
    // declaramos nueva schema de Post con url de cloudinaty
    const post = new Post({
      title, 
      category, 
      resume,
      fullContent,
      image: req.file.path, // source_url
      imagePublicId: req.file.filename // public_id (products/name_file)
    })
    // guardamos la schema a la db
    await post.save()
    // declaramos mensaje de salida y estado http
    res.status(200).json({message: 'Publicación creada', post})
  } catch (err) {
    res.status(500).send('Error al crear la publicación')
    console.error('> Error al crear la publicación', err)
  }
}

export const updatePost = async (req, res) => {
  try {
    // obtenemos el id
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
      return res.status(400).send('Publicación no encontrado')
    }
    // preparamos la data
    const data = {...req.body}
    // si viene una imagen
    if (req.file) {
      // borrar la imagen anterior de cloudinary
      if (post.imagePublicId) {
        await cloudinary.uploader.destroy(post.imagePublicId)
      }
      //guardamos la info
      data.image = req.file.path // secure_url
      data.imagePublicId = req.file.filename  // public_id
    }
    const postUpdated = await Post.findByIdAndUpdate(id, data)
    res.status(200).json({ message: 'Publicación actualizado', post: postUpdated })
  } catch (err) {
    res.status(500).send('Error al actualizar la publicación')
    console.error('> Error al actualizar la publicación', err)
  }
}

export const deletePost = async (req, res) => {
  try {
    // obtenemos el id
    const { id } = req.params
    // Buscar la publicación
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).send('Publicación no encontrado')
    }
    // Si hay imagen en Cloudinary → eliminarla
    if (post.imagePublicId) {
      await cloudinary.uploader.destroy(post.imagePublicId)
    }
    // eliminamos el producto
    const postDeleted = await Post.findByIdAndDelete(id)
    res.status(200).json({ message: "Publicación eliminado", post: postDeleted })
  } catch (err) {
    res.status(500).send('Error al eliminar la publicación')
    console.log('> Error al eliminar la publicación', err)
  }
}