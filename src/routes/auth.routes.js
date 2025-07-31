import {Router} from "express"
import {authRequired} from "../middlewares/validateToken.js"
import {register, login, logout, profile, userUpdate} from "../controllers/auth.controller.js"

const router = Router()

router.post("/register", register)
router.post("/update/:_id", userUpdate )
router.post("/login", login)
router.post("/logout", logout)

router.get("/profile", authRequired, profile)

export default router

