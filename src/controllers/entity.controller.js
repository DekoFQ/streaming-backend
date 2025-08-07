import entityModels from "../models/entity.models.js";


export const createEntity = async (req, res) => {
    try {
        const { name, description, logoUrl, link, maxUsers, price } = req.body;

        const existingEntity = await entityModels.findOne({ name })

        if (existingEntity)
            return res.status(400).json({ message: "Ya existe esa entidad" });


        const newEntity = await new entityModels({
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
        const query = {available:true, ...req.query}

        const entities = await entityModels.find(query);
        
        return res.status(200).json(entities);
    }catch (error) {
        return res.status(500).json({ message: 'Error al obtener las entidades', error: error.message });
    }
}

export const getEntitie = async (req, res) => {
    try {
        const {_id} = req.params
        const entitie = await entityModels.findById(_id)

        if(!entitie) return res.status(404).json({message: 'Entitie not found'})

        res.json(entitie)
    } catch (error) {
        return 
    }
}

export const updateEntitie = async (req, res) => {
    try {
        
        const {_id} = req.params

        const updateEntitie = await entityModels.findOneAndUpdate({_id}, {
            $set: req.body
        }, {
            new: true
        })

        res.json(updateEntitie)

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteEntitie = async (req, res) => {
    try {
        const {_id} = req.params

        const deleteEntitie = await entityModels.deleteOne({_id})

        if(!deleteEntitie) return res.status(404).json({message: "Entitie not found"})

        res.json({message: "Entitie deleted"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}