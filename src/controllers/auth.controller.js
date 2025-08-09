import usersModel from "../models/users.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import { sendEmailWelcome } from "./email.controller.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, rol, active } = req.body;

    const userFound = await usersModel.findOne({ email });
    if (userFound) return res.status(400).json({ message: "Este correo ya está registrado" });

    const passwordHash = await bcryptjs.hash(password, 10);

    const newUser = await new usersModel({
      firstName,
      lastName,
      email,
      password: passwordHash,
      rol,
      active
    }).save();

    // Esta parte es para enviar un correo de bienvenida al usuario y sin consumo de producto
    await sendEmailWelcome(email, firstName, lastName, "https://www.netflix.com");

    const token = await createAccessToken({ _id: newUser._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax'
    });

    res.json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await usersModel.findOne({ email });
    if (!userFound) return res.status(404).json({ message: 'Usuario no existente' });

    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = await createAccessToken({ _id: userFound._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 1000 * 60 * 60 * 24
    });

    res.json({
      _id: userFound._id,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
      rol: userFound.rol
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await usersModel.findById(req.user._id);
  if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    _id: userFound._id,
    firstName: userFound.firstName,
    lastName: userFound.lastName,
    email: userFound.email,
    rol: userFound.rol,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  });
};


export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const updatedUser = await usersModel.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, email },
      { new: true }
    );

    res.json({ message: "Perfil actualizado con éxito", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await usersModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcryptjs.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña actual incorrecta" });

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteAccount = async (req, res) => {
  try {
    const user = await usersModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (user.rol !== "CLIENTE") {
      return res.status(403).json({ message: "Solo los clientes pueden eliminar su cuenta" });
    }

    await usersModel.findByIdAndDelete(req.user._id);

    res.clearCookie("token");
    res.json({ message: "Cuenta eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
