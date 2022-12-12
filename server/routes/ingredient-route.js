import express from "express";
import {
  browseIngredients,
  registerIngredients,
  updateIngredient,
} from "../controllers/ingredient-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .post("/add-ingredient", protect, registerIngredients)
  .put("/update-ingredient/:id", protect, updateIngredient)
  .get("/browse-ingredients",protect, browseIngredients);

export default router;
