import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;
const collectionName = "entities";

const entitySchema = new Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    description: { type: String },
    logoUrl: { type: String },
    link: { type: String },
    maxUsers: { type: Number },
    price: { type: Number }
}, {
    _id: false,
    versionKey: false,
    timestamps: true
})

export default mongoose.model(collectionName, entitySchema);