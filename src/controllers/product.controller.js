import productModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
    try {

        const { _id } = req.params;
        const { name, price, amount} = req.body;

        const productFound = await productModel.findOne({ _id });
 
        

        if (productFound)
            return res.status(400).json({ message: "Ya existe este producto" });
      

        const newProduct = new productModel({
            name,
            price, 
            amount
        }).save();

        console.log(newProduct);

        res.status(201).json({ message: 'Producto creado' });

    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}