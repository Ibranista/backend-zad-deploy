import User from "../models/user-model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user
// users/registerUser

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, role, password } = req.body;
  if (!firstName || !lastName || !email || !phoneNumber || !role || !password) {
    res
      .status(400)
      .send(res.json({ message: "Please insert all credentials!" }));
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send(res.json({ message: "user already exists" }));
  }

  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    password: hashed_password,
  });

  if (user) {
    res.status(201).json({
      first_name: user.firstName,
      _id: user._id,
      email: user.email,
      token: generate_jwtToken(user._id, user.email),
    });
  } else {
    res.status(400).send(res.json({ message: "user not created" }));
  }
});

// user login
// /login

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if(!email || !password){
    res
    .status(400)
    .send(res.json({ message: "Please insert all credentials!" }));
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user._id,
      name: user.firstName,
      email: user.email,
      role:user.role,
      token: generate_jwtToken(user._id, email),
    });
  } else {
    res.status(400);
    throw new Error(`Either user email or password is incorrect !`);
  }
});

export const myToken = asyncHandler(async (req, res) => {
  if (req.token_user) return res.status(200).json(req.token_user);
  else {
    return res.status(400).send(res.json({message:"no token!"}))
  }
});

const generate_jwtToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET);
};
