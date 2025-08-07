import { Router } from "express";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct} from "../controllers/product.controller.js";

const router = Router();

router.post("/createProduct", createProduct);
router.get("/getProducts", getProducts);
router.get("/getProductById/:_id", getProductById);
router.post("/updateProduct/:_id", updateProduct);
router.post("/deleteProduct/:_id", deleteProduct);

export default router;