import { Router } from "express";
import { createEntity, getEntities, getEntitie, updateEntitie, deleteEntitie } from "../controllers/entity.controller.js";

const router = Router();

router.post("/entities", createEntity);

router.get("/entities", getEntities);

router.get("/entities/:_id", getEntitie)

router.put("/entities/:_id", updateEntitie)

router.delete("/entities/:_id", deleteEntitie)

export default router