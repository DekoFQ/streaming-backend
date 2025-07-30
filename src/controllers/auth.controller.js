import usersModel from "../models/users.model.js";
import bcryptjs from "bcryptjs";

export const register = async(req, res) => {
    try {
        // Trabajado con metodo POST
        const {firstName,lastName,email,password,rol} = req.body;

        // desde aqui se estan validando que no hayan usuarios existentes con el mismo Email
        // findOne, find(Todos los datos), se utiliza para buscar en la base de datos
        const userFound = await usersModel.findOne({email})

        if (userFound) 
            return res.status(400).json({menssage: "Esta Repetido :c"})
        
        const passwordHash = await bcryptjs.hash(password,10)
        
        // Aqui se esta guardando los usuarios
        const newUser = await new usersModel({
            firstName,
            lastName,
            email,
            password:passwordHash,
            rol
        }).save()


        console.log(newUser)

        res.json({
            newUser
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
// Aqui empezaremos a hacer la actualizacion del usuario
export const userUpdate = async(req, res) =>{
    try {
        const {_id} = req.params
        const {firstName,lastName,email,password,rol} = req.body

        const userFound = await usersModel.findOne({_id})

        const passwordHash = await bcryptjs.hash(password,10)

        if(!userFound)
            return res.status(404).json({menssage: "No existe pa :c"})

        const updateUser = await usersModel.findOneAndUpdate({_id}, {
            $set: {
                firstName,
                lastName,
                email,
                password:passwordHash,
                rol
            }
        }, {new: true})

        res.json(updateUser)


    } catch (error) {
        res.status(500).json({message: error.message})
    }
}