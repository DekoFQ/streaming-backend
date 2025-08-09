import { Router } from "express";
import { createClient, getClients, getClientById, updateClient, deleteClient } from "../controllers/client.controller.js";

const router = Router();

router.post("/clients", createClient);
router.get("/clients", getClients);
router.get("/clients/:_id", getClientById);
router.put("/clients/:_id", updateClient);
router.delete("/clients/:_id", deleteClient);

export default router;
