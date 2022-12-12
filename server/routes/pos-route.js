import express from "express";
import { fetchSoldProduct, registerSell } from "../controllers/pointOfSell.js";
import { protect } from "../middleware/authMiddleware.js";

let router = express.Router();

router
  .post("/sellProducts", protect, registerSell)
  .get("/soldProducts", protect, fetchSoldProduct);

export default router;
