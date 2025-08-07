import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;
const collectionName = "products";

const productsSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, minLength: 6 },
    active: { type: Boolean, default: true },

    // Datos del cliente que compro la venta
    soldTo: {
        _id: String,
        name: String,
        email: String,
        
    },
    entity: {
        type: String,
        ref: 'entities',
        required: [true, 'Entidad requerida']
    },
}, {
    _id: false,
    versionKey: false,
    timestamps: true
})

export default mongoose.model(collectionName, productsSchema);