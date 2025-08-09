import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  register,
  login,
  logout,
  profile,
  updateProfile,
  changePassword,
  deleteAccount
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", authRequired, profile);
router.put("/profile", authRequired, updateProfile);
router.put("/profile/password", authRequired, changePassword);
router.delete("/profile", authRequired, deleteAccount);

export default router;
