import saleModel from "../models/sale.model.js";
import productModel from "../models/product.model.js";
import entityModel from "../models/entity.models.js";

export const createSale = async (req, res) => {
    try {
        const { client, seller, product, paymentMethod, salePrice } = req.body;

       

        // Validar existencia del producto
        const productFound = await productModel.findById(product);
        console.log(productFound);
        if (!productFound) return res.status(404).json({ message: "Producto no encontrado" });

        // Validar existencia de la entidad
        const entityFound = await entityModel.findById(productFound.entity);
        console.log(entityFound);
        if (!entityFound) return res.status(404).json({ message: "Entidad no encontrada" });
        
        // validar las cuentas activas 
        const activeSalesCount = await saleModel.countDocuments({
            entity: product.entityId,
            Status: { $ne: "Activa" }
        })

        if (activeSalesCount >= entityFound.maxActiveSales) {
            return res.status(400).json({ message: "Límite de ventas activas alcanzado para esta entidad" });
        }

        // Crear la venta
        const newSale = new saleModel({
            client,
            seller,
            product: {
                _id: product._id,
                email: product.email,
                password: product.password,
                entityName: entityFound.name,
                entityId: product.entityId,
            },
            paymentMethod,
            salePrice
        });

        await newSale.save();

        await productModel.findByIdAndUpdate(product._id, {
            active: false,
            soldTo: {
                _id: client._id,
                name: client.name,
                email: client.email
            }
        });

        const savedSale = await newSale.save();


        console.log("Venta creada", savedSale);
        res.status(201).json(savedSale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}