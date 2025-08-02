import {Router} from "express"
import { createClient, getClients, getClientById, updateClient, deleteClient } from "../controllers/client.controller.js"

const router = Router()

router.post("/create", createClient)
router.get("/getClients", getClients)
router.get("/getClientById/:_id", getClientById)
router.post("/updateClient/:_id", updateClient)
router.get("/deleteClient/:_id", deleteClient)
export default router