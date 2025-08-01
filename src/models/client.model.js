import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;
const collectionName = 'clients';

// Definir lo que vamos a guardar
const clientSchema = new Schema({
    _id: { type: String, default: uuidv4 },
})