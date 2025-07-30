import {Router} from "express"
import {register, userUpdate} from "../controllers/auth.controller.js"

const router = Router()

router.post("/register", register)
router.post("/update/:_id", userUpdate )
router.post("/login", ()=>{console.log("login")})

export default router

