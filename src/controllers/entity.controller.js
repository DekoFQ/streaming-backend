import entityModels from "../models/entity.models.js";


export const createEntity = async (req, res) => {
    try {
        const { name, description, logoUrl, link, maxUsers, price } = req.body;

        const existingEntity = await entityModels.findOne({ name })

        if (existingEntity)
            return res.status(400).json({ message: "Ya existe esa entidad" });


        const newEntity = new entityModels({
            name,
            description,
            logoUrl,
            link,
            maxUsers,
            price
        }).save();

        console.log("Nueva entidad creada", newEntity);

        return res.status(201).json(newEntity);
    }catch (error) {
        return res.status(500).json({ message: 'Error al crear la entidad', error: error.message });
    }
}

export const getEntities = async (req, res) => {
    try {
        const entities = await entityModels.find();
        return res.status(200).json(entities);
    }catch (error) {
        return res.status(500).json({ message: 'Error al obtener las entidades', error: error.message });
    }
}

