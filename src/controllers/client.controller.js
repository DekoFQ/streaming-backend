import userModel from "../models/users.model.js";
import { sendEmailWelcome } from "./email.controller.js";
import productModel from "../models/product.model.js";
import bcryptjs from "bcryptjs";

// Crear un nuevo Cliente
export const createClient = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const clientFound = await userModel.findOne({ email });

        if (clientFound)
            return res.status(400).json({ message: "Ya existe un cliente con ese Email" });

        const passwordHash = await bcryptjs.hash(password, 10);

        const newClient = await new userModel({
            firstName,
            lastName,
            email,
            password: passwordHash
        }).save();

        await sendEmailWelcome(email, password, firstName, lastName);

        console.log("Nuevo Cliente creado", newClient);

        res.status(201).json({ message: 'Usuario registrado y correo enviado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Traer el listado de todos los Clientes
export const getClients = async (req, res) => {
    try {
        const query = {...req.query}
        const clients = await userModel.find(query);
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Traer Cliente por el ID
export const getClientById = async (req, res) => {
    try {
        const { _id } = req.params;
        const getClient = await userModel.findById({ _id });

        if (!getClient) return res.status(404).json({ message: "Cliente no encontrado" });

        console.log("Cliente encontrado:", getClient);
        res.status(200).json(getClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualización de los clientes
export const updateClient = async (req, res) => {
    try {
        const updateClient = await userModel.findByIdAndUpdate(req.params._id, req.body, { new: true });

        if (!updateClient) return res.status(404).json({ message: "Cliente no encontrado" });

        console.log("Cliente actualizado:", updateClient);
        res.json(updateClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar Cliente por ID
export const deleteClient = async (req, res) => {
    try {
        const deleteClient = await userModel.findByIdAndDelete(req.params._id);

        if (!deleteClient) return res.status(404).json({ message: "Cliente no encontrado" });

        // Si quieres eliminar productos relacionados al cliente, hazlo aquí

        console.log("Cliente eliminado:", deleteClient);
        res.json({ message: "Cliente eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
