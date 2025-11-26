import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  fullContent: {
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

postSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

export default mongoose.model('Post', postSchema)