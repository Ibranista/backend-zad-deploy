import express from "express";
import {
  addProduct,
  fetchProduct,
} from "../controllers/bakeryProductController.js";
import { protect } from "../middleware/authMiddleware.js";

let router = express.Router();

router
  .post("/addProduct", protect, addProduct)
  .get("/bakeryItems", protect, fetchProduct);

export default router;
