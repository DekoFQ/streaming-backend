import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"

const { Schema } = mongoose
const collectionName = 'users'

// Definir lo que vamos a guardar
const userSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  firstName: { type: String, },
  lastName: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  rol: {type: String,
    enum: ["ADMIN", "VENDEDOR", "CLIENTE"],
    default: "CLIENTE"
  }
},
{
  _id: false,
  versionKey: false,
  timestamps: true
})


export default mongoose.model(collectionName, userSchema)
