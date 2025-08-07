import { Router } from "express";
import { createEntity, getEntities } from "../controllers/entity.controller.js";

const router = Router();

router.post("/createEntity", createEntity);
router.get("/list", getEntities);

export default router