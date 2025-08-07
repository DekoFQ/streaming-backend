import { Router } from "express";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct} from "../controllers/product.controller.js";

const router = Router();

router.post("/product", createProduct);
router.get("/product", getProducts);
router.get("/product/:_id", getProductById);
router.put("/product/:_id", updateProduct);
router.delete("/product/:_id", deleteProduct);

export default router;