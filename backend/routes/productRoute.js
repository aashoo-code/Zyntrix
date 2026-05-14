import express from "express"; 
import { addProduct, deleteProduct, getAllProduct, updateProduct } from "../controller/productController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { multiUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/add",isAuthenticated, isAdmin, multiUpload, addProduct);
router.get('/getAllProducts', getAllProduct)
router.delete("/delete/:productId", isAuthenticated, isAdmin, deleteProduct)
router.put('/update/:productId', isAuthenticated, isAdmin, multiUpload, updateProduct)


export default router;