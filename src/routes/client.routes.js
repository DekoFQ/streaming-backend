import {Router} from "express"
import {register, login, logout, profile, userUpdate} from "../controllers/auth.controller.js"
import { createClient } from "../controllers/client.controller.js"

const router = Router()

router.post("/create", createClient)

export default router