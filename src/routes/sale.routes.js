import { Router } from "express";
import {createSale} from "../controllers/sale.controller.js";

const router = Router();

router.post("/sale", createSale);

export default router;