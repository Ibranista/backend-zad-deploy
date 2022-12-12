import bakeryProduct from "../models/bakery-productModel.js";
import asyncHandler from "express-async-handler";

// bakery/addProduct

export const addProduct = asyncHandler(async (req, res) => {
  const [{ productName, sellingPrice, productWeight, ingredientLists }] =
    req.body;
  console.log(req.body);
  if (!productName || !sellingPrice || !productWeight || !ingredientLists) {
    res.status(400).send(res.json({ message: "ሁሉንም የምርት ዝርዝር ማስገባት አለቦት!" }));
  }

  const productExists = await bakeryProduct.findOne({ productName });

  if (productExists) {
    res.status(400).send(res.json({ message: "ይህ ምርት ከዚ በፊት ተመዝግቧል!" }));
  }

  let productItem;

  if (!req.token_user) {
    res.status(400).send(res.json({ message: "ፍቃድ የሎትም!" }));
  }

  if (req.token_user) {
    let productItems = req.body;
    productItems.forEach((obj) => {
      obj.user = req.token_user.id;
    });
    productItem = await bakeryProduct.insertMany(productItems);
  }

  if (productItem) {
    res.status(201).json(productItem);
  }

  if (!productItem) {
    res.status(400).send(res.json({ message: "ምንም ምርት አልተመዘገም!" }));
  }
});

export const fetchProduct = asyncHandler(async (req, res) => {
  if (!req.token_user) {
    res.status(400).json({ messsage: "ፍቃድ የሎትም!" });
  }

  if (req.token_user) {
    let productItems = await bakeryProduct.find({ user: req.token_user.id });
    res.status(200).json(productItems);
  }
});
