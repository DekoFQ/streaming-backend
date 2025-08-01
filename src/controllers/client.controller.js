import clientModel from "../models/client.model.js";
import { sendEmail } from "./email.controller.js";

export const createClient = async (req, res) => {
    try {
        const { firstName, lastName, phone, email } = req.body;

        const clientFound = await clientModel.find({ email, phone });

        if (clientFound == email) {
            return res.status(400).json({ message: "Ya existe un cliente con ese Email" });
        } else if (clientFound == phone) {
            return res.status(400).json({ message: "Ya existe un cliente con ese numero de celular" });
        }

        const newClient = await new clientModel({
            firstName,
            lastName,
            phone,
            email
        });

        // Enviar correo de bienvenida
        await sendEmail(email, firstName, lastName);

        console.log(sendEmail);


        res.status(201).json({ mensaje: 'Usuario registrado y correo enviado' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

