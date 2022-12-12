import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log('token from server',req.headers.authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const token_user = await User.findById(decode.id).select("-password");

      req.token_user = token_user

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Permission denied!");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No token for this user!");
  }
});
