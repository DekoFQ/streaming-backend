// import clientModel from "../models/client.model.js";
// import clientProductModel from "../models/clientProduct.model.js";
import { sendEmailWelcome } from "./email.controller.js";

// Crear un nuevo Cliente
// Se crea el cliente y se envía un correo de bienvenida
export const createClient = async (req, res) => {
    try {
        const { _id } = req.params;
        const { firstName, lastName, phone, email, productId } = req.body;

        const clientFound = await clientModel.findOne({
            $or: [{ email }, { phone }]
        })

        console.log("Cliente encontrado:", clientFound);

        if (clientFound)
            return res.status(400).json({ message: "Ya existe un cliente con ese Email o con ese numero telefonico" });

        // const relationFound = await clientProductModel.findOne({
        //     clientId: _id,
        //     productId: productId
        // });

        // if (relationFound && relationFound.active === true) {
        //     return res.status(400).json({ message: "El cliente, ya cuenta con este producto activo" });
        // }

        // console.log("Relación encontrada:", relationFound);

        const newClient = await new clientModel({
            firstName,
            lastName,
            phone,
            email,
            productId
        }).save();



        // const newRelation = await new clientProductModel({
        //     clientId: newClient._id,
        //     productId: productId,
        //     active: true
        // }).save();


        // Enviar correo de bienvenida
        await sendEmailWelcome(email, firstName, lastName);

        console.log("Nuevo Cliente creado", newClient);


        res.status(201).json({ message: 'Usuario registrado y correo enviado' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Traer el listado de todos los Clientes
export const getClients = async (req, res) => {
    try {
        const clients = await clientModel.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Traer Cliente por el ID
export const getClientById = async (req, res) => {
    try {

        const { _id } = req.params;
        console.log("ID recibido:", _id);
        const getClient = await clientModel.findById({ _id });
        console.log("Cliente encontrado:", getClient);

        if (!getClient) return res.status(404).json({ menssage: "Cliente no encontrado" });

        res.status(200).json(getClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// actualizacion de los clientes
export const updateClient = async (req, res) => {
    try {

        const updateClient = await clientModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (!updateClient) return res.status(404).json({ message: "Cliente no encontrado" });

        res.json(clientFound);
        console.log("Cliente actualizado:", updateClient);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Eliminar Cliente por ID
export const deleteClient = async (req, res) => {
    try {

        const deleteClient = await clientModel.findByIdAndDelete(req.params._id);
        if (!deleteClient) return res.status(404).json({ message: "Cliente no encontrado" });

        res.json({ menssage: "Cliente eliminado exitosamente" });
        console.log("Cliente eliminado:", deleteClient);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}