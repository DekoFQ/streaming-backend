import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();


router.post("/products", createProduct);                   
router.get("/products", getProducts);                      
router.get("/products/:_id", getProductById);
router.put("/products/:_id", updateProduct);                
router.delete("/products/:_id", deleteProduct);             

export default router;
