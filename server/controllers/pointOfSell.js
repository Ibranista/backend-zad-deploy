import Pos from "../models/sellProductModel.js";
import asyncHandler from "express-async-handler";

// register sells

export const registerSell = asyncHandler(async (req, res) => {
  let [{ productName, itemsSold }] = req.body;
  if (!productName || !itemsSold) {
    res
      .status(400)
      .send(res.json({ message: "All information must be supplied!" }));
  }

  if (!req.token_user) {
    res
      .status(400)
      .send(res.json({ message: "you don't have permission to sell items!" }));
  }

  let soldItems;

  let items = req.body;
  items.forEach((obj) => {
    obj.user = req.token_user.id;
  });
  soldItems = await Pos.insertMany(items);

  if (soldItems) {
    res.status(201).json(soldItems);
  }

  if (!soldItems) {
    res.status(400).send(res.json({ message: "selling failed!" }));
  }
});

// fetching sold products

export const fetchSoldProduct = asyncHandler(async (req, res) => {
  if (!req.token_user) {
    res.status(400).json({ messsage: "ፍቃድ የሎትም!" });
  }

  if (req.token_user) {
    let SoldItems = await Pos.find({ user: req.token_user.id });
    res.status(200).json(SoldItems);
  }
});
