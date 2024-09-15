import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/Product.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct); // No addedBy field
router.put("/:id", auth, updateProduct); // Protected route
router.delete("/:id", auth, deleteProduct); // Protected route

export default router;
