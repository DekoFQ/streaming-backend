import usersModel from "../models/users.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js"
import jwt from "jsonwebtoken"
import { sendEmailWelcome } from "./email.controller.js";

export const register = async (req, res) => {
  try {
    // Trabajado con metodo POST
    const { firstName, lastName, email, password, rol, active } = req.body;

    // desde aqui se estan validando que no hayan usuarios existentes con el mismo Email
    // findOne, find(Todos los datos), se utiliza para buscar en la base de datos
    const userFound = await usersModel.findOne({ email })

    if (userFound)
      return res.status(400).json({ menssage: "Este correo ya esta registrado" })

    const passwordHash = await bcryptjs.hash(password, 10)

    // Aqui se esta guardando los usuarios
    const newUser = await new usersModel({
      firstName,
      lastName,
      email,
      password: passwordHash,
      rol,
      active
    }).save()

    // Esta parte es para enviar un correo de bienvenida al usuario y sin consumo de producto
    await sendEmailWelcome(email, firstName, lastName, "https://www.netflix.com");

    console.log("Nuevo usuario creado", newUser);
    console.log("Usuario creado con exito");

    // Creación del token
    const token = await createAccessToken({ _id: newUser._id })


res.cookie("token", token, {
  httpOnly: true,
  secure: false, // pon true si usas HTTPS
  sameSite: 'Lax' // o 'None' si secure: true
});

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email y contraseña requeridos' });

    const userFound = await usersModel.findOne({ email });
    if (!userFound) return res.status(404).json({ message: 'Usuario no existente' });

    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = await createAccessToken({ _id: userFound._id });

    // ✅ Cookie correctamente configurada
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true si usas HTTPS
      sameSite: 'Lax', // o 'None' si secure: true
      maxAge: 1000 * 60 * 60 * 24 // 1 día
    });

    // ✅ Devolver datos del usuario
    res.json({
      _id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })

  return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const userFound = await usersModel.findById(req.user._id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    _id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    rol: userFound.rol,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  });
};



// Aqui empezaremos a hacer la actualizacion del usuario
export const userUpdate = async (req, res) => {
  try {
    const { _id } = req.params
    const { firstName, lastName, email, password, rol } = req.body

    const userFound = await usersModel.findOne({ _id })

    const passwordHash = await bcryptjs.hash(password, 10)

    if (!userFound)
      return res.status(404).json({ menssage: "No existe pa :c" })

    const updateUser = await usersModel.findOneAndUpdate({ _id }, {
      $set: {
        firstName,
        lastName,
        email,
        password: passwordHash,
        rol
      }
    }, { new: true })

    res.json(updateUser)


  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}