import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;
const collectionName = "products";

const productSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true }
},{
    _id: false,
    versionKey: false,
    timestamps: true
});

export default  mongoose.model(collectionName, productSchema);