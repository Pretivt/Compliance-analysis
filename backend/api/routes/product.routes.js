import express from "express";
import { upload } from "../middlewares/multer.js";
import { createProduct, getProductsByCompany,  getAllProducts  } from "../controllers/product.controller.js";
import { isUser, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();



 router.post("/create", protect,isUser, upload.array("images", 5), createProduct);
router.get("/get-by-company/:companyId", protect, getProductsByCompany);
router.get("/get-products", protect, getAllProducts);
export default router;



