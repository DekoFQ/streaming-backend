import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const {Schema} = mongoose;
const collectionName = "clientProducts";

// creamos una tabla para asociar clientes y productos
const clientSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    clientId: {
        type: String,
        ref: 'clients',
        required: true
    },
    productId: {
        type: String,
        ref: 'products',
        required: true
    },
    active: { type: Boolean, default: true }
}, {
    _id: false,
    versionKey: false,
    timestamps: true
})

export default mongoose.model(collectionName, clientSchema);