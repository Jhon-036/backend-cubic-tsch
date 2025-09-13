import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  imagePublicId: {
    type: String
  }
}, {
  timestamps: true // agrega fechaCreacion y fechaUltimaActualizacion
})

export default mongoose.model('Product', productSchema)