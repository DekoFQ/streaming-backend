import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;
const collectionName = "sales";

const saleSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    client: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    seller: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    product: {
        _id: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        entityName: { type: String, required: true },
        entityId: { type: String, required: true },
    },

    paymentMethod: {type: String, },
    salePrice: {type: Number},
    saleDate: { type: Date, default: Date.now },

    Status: {
        type: String,
        enum: ["Completada", "Pendiente", "Cancelada"],
        default: "Pendiente"
    }
},
{
    _id: false,
    versionKey: false,
    timestamps: true
});