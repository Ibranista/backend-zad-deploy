import express from "express";
import {
  myToken,
  registerUser,
  userLogin,
} from "../controllers/user-controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .post("/signup", registerUser)
  .post("/login", userLogin)
  .get("/userToken", protect, myToken);

export default router;
