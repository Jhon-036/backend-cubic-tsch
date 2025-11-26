import mongoose from "mongoose"
import Counter from './counterModel.js'

const ordersSchema = new mongoose.Schema({
  number: {
    type: Number,
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email : {
    type: String,
    required: true
  },
  telefono: {
    type: Number
  },
  rucodni: {
    type: Number
  },
  item: {
    type: String,
    required: true
  },
  ip: {
    type: String
  }
}, {
  timestamps: true
})

ordersSchema.pre("save", async function (next) {
  // solo ejecutar si es un documento nuevo
  if (this.isNew) {

    const counter = await Counter.findByIdAndUpdate(
      { _id: "orderNumber" },     // nombre del contador
      { $inc: { seq: 1 } },       // incrementa +1
      { new: true, upsert: true } // si no existe, lo crea
    );

    this.number = counter.seq; // asignar a la orden
  }

  next();
});

ordersSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.number = ret.number.toString().padStart(4, "0")
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

export default mongoose.model('Order', ordersSchema)