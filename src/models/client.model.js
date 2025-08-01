import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;
const collectionName = 'clients';

// Definir lo que vamos a guardar
const clientSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: { type: String, required: true},
    email: { type: String, required: true},
},
{
    _id: false,
    versionKey: false,
    timestamps: true
});

export default mongoose.model(collectionName, clientSchema);