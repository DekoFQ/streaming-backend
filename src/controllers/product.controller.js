import productModel from "../models/product.model.js";
import entityModels from "../models/entity.models.js";


export const createProduct = async (req, res) => {
    try{
       const { email, password, entity } = req.body;

        const entityFound = await entityModels.findById(entity);
        if (!entityFound) return res.status(404).json({ message: "Entidad no encontrada" });

        // contar cuantos productos tiene asociados a esta entidad
        // El countDocuments sirve para contar cuantos documentos hay en una coleccion
        // const productCount = await productModel.countDocuments({ entity });

        // Validar que no supere el maximo de usuarios
        // if (productCount >= entityFound.maxUsers){
        //     return res.status(400).json({ message: `${entityFound.name} ya alcanzo el maximo de pantallas para este usuario` });
        // }


        const emailExists = await productModel.findOne({ email });
        if (emailExists) return res.status(400).json({ message: "El email ya esta registrado" });

        const newProduct = await new productModel({
            email,
            password,
            entity,
            // soldTo: req.user._id // Asignar el usuario que esta creando el producto
        }).save();

        console.log("Nuevo producto creado", newProduct);
        res.status(201).json(newProduct);


    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        .populate('entity', 'name')
        .populate('soldTo', 'firstName lastName email');
        console.log("Productos obtenidos", products);
        res.json(products);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { _id } = req.params;
        const product = await productModel.findById({ _id })
            .populate('entity', 'name')
            .populate('soldTo', 'firstName lastName email');

        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        console.log("Producto encontrado", product);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {email, password, entity, active} = req.body;
        const { _id } = req.params;


        const productFound = await productModel.findById({ _id });
        if (!productFound) return res.status(404).json({ message: "Producto no encontrado" });

       // const productFound = await productModel.findOne({ _id });
 
        


        if (entity && entity !== productFound.entity.toString()) {
            const entityFound = await entityModels.findById(entity);
            if (!entityFound) return res.status(404).json({ message: "Entidad no encontrada" });
        }

        productFound.email = email || productFound.email;
        productFound.password = password || productFound.password;
        productFound.entity = entity || productFound.entity;
        productFound.active = active !== undefined ? active : productFound.active;
        const updatedProduct = await productFound.save();
        console.log("Producto actualizado", updatedProduct);
        res.json(updatedProduct);


    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { _id } = req.params;
        const productFound = await productModel.findById({ _id });
        if (!productFound) return res.status(404).json({ message: "Producto no encontrado" });

        await productModel.deleteOne({ _id });
        console.log("Producto eliminado", productFound);
        res.sendStatus(204).json({ message: "Producto eliminado" });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}
