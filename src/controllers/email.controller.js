import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dieguito12557@gmail.com',
        pass: 'wguesrhwrvnineay',
    }
})

export const sendEmail = async (email, firstName, lastName) => {
    try {
        const info = await transporter.sendMail({
            from: "Diego",
            to: email,
            subject: "Bienvenido a nuestra plataforma de Steaming",
            html: `<h1>Hola ${firstName} ${lastName}</h1><p>Te hemos registrado en nuestra plataforma</p>`
        })

        console.log('Correo enviado:', info.messageId);

    }
    catch (error) {
        console.error("Error al enviar el correo:", error);
    }
}