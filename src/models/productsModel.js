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

productSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.imagePublicId
    delete ret.createdAt
    delete ret.updatedAt
    return ret
  }
})

export default mongoose.model('Product', productSchema)