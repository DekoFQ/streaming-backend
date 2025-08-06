import usersModel from "../models/users.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    // Trabajado con metodo POST
    const { firstName, lastName, email, password, rol } = req.body;

    // desde aqui se estan validando que no hayan usuarios existentes con el mismo Email
    // findOne, find(Todos los datos), se utiliza para buscar en la base de datos
    const userFound = await usersModel.findOne({ email })

    if (userFound)
      return res.status(400).json({ menssage: "Esta Repetido :c" })

    const passwordHash = await bcryptjs.hash(password, 10)

    // Aqui se esta guardando los usuarios
    const newUser = await new usersModel({
      firstName,
      lastName,
      email,
      password: passwordHash,
      rol
    }).save()

    // Creación del token
    const token = await createAccessToken({ _id: newUser._id })


    res.cookie("token", token)

    res.json({
      newUser
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {

    const {email, password} = req.body

    if (!email || !password)
      return res.status(400).json({ message: 'Email y contraseña requeridos' });

    const userFound = await usersModel.findOne({email})
    if (!userFound) return res.status(404).json({ message: 'Usuario no existente' })

    // Comparación de contraseña entrante con la que está en base de datos. Devuelve true o false
    const isMatch = await bcryptjs.compare(password, userFound.password)
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' })

    // Se crea token
    const token = await createAccessToken({_id: userFound._id})

    res.cookie("token", token)
    res.json({
      _id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  } catch (error) {
     res.status(500).json({message: error.message})
  }
}

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })

  return res.sendStatus(200)
}

export const profile = async (req, res) => {

  console.log(req.user);
  
  const userFound = await usersModel.findById(req.user._id)

  if (!userFound) return res.status(400).json({ message: "User not found" })


  return res.json({
    _id: userFound.username,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  })
}


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