import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})
// "https://www.netflix.com"
export const sendEmailWelcome = async (email, firstName, lastName, linkEntity) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Bienvenido a nuestra plataforma de Steaming",
            html: `<!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto;">
                    <h2 style="color: #e50914;">🎬 ¡Hola ${firstName} ${lastName} Bienvenido nuestra plataforma de Streaming! 🌴</h2>
                    <p>Gracias por registrarte. Estás a un clic de empezar a disfrutar contenido sin límites.</p>
                    <p>Haz clic en el siguiente botón para empezar a explorar:</p>
      
                <a href="${linkEntity}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #e50914; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    🌟 Ir a la plataforma
                </a>
      
                    <p style="margin-top: 30px;">Nos alegra tenerte con nosotros,<br>— El equipo de Streaming</p>
                </div>
            </body>
            </html>`
        })

        console.log('Correo enviado:', info.messageId);

    }
    catch (error) {
        console.error("Error al enviar el correo:", error);
    }
}