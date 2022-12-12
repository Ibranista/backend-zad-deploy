import Ingredient from "../models/ingredient-model.js";
import User from "../models/user-model.js";
// asynchandler
import asyncHandler from "express-async-handler";

// register ingredients
export const registerIngredients = asyncHandler(async (req, res) => {
  const { ingredientName, ingredientPrice, ingredientWeight, deliveryPayment } =
    req.body;
  if (
    !ingredientName ||
    !ingredientPrice ||
    !ingredientWeight ||
    !deliveryPayment
  ) {
    res.status(400).send(res.json({ message: `እባኮ ሁሉንም አሟሉ!` }));
  }
  let ingredientExist = await Ingredient.findOne({ ingredientName });

  if(ingredientExist){
    res.status(400).json({message:`${ingredientName} ከዚ በፊት ተመዝግቧል!`})
  }
  if (!req.token_user) {
    res.status(400).send(res.json({ message: "ፍቃድ የሎትም!" }));
  }
  let ingredient;
  if (req.token_user) {
    ingredient = await Ingredient.create({
      ingredientName,
      ingredientPrice,
      ingredientWeight,
      deliveryPayment,
      user: req.token_user.id,
    });
  }


  if (ingredient) {
    res.status(201).json(ingredient);
  } else {
    res.status(400).send(res.json({ message: "ይህ ምርት አልተመዘገበም!" }));
  }
});
// Browse all
export const browseIngredients = asyncHandler(async (req, res) => {
  // specific users ingredient
  if (!req.token_user) {
    res
      .status(400)
      .json({ message: "for this token no permission! registIngmethod" });
  }
  let ingredients = await Ingredient.find({ user: req.token_user._id });
  res.status(200).json(ingredients);
});
// delete one
export const deleteIngredient = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const Item = await Ingredient.findById(req.params.id);
  const user = await User.findById(req.tokenUser.id);
  // check if user exists
  if (!user) {
    res.status(401).send;
    res.json({
      message: "user not found!",
    });
  }
  // checking the logged in user with the itom creator user
  if (Item.user.toString() !== user.id) {
    res.status(401);
    throw new Error(
      res.json({
        message: "user not authorized!",
      })
    );
  }
  if (!Item) {
    res.status(400);
    throw new Error("not found");
  }
  try {
    const ingredient = await Ingredient.deleteOne({ _id: itemId });
    res.status(200).json({
      message: "deleted successfully",
      deleted_item: ingredient,
    });
  } catch (error) {
    res.status(400).json({
      message: "item not found",
    });
  }
});
// find one
export const browseIngItem = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await Ingredient.findOne({ _id: itemId });
    res.json(item);
  } catch (error) {
    res.json("Item not found.");
  }
});
// edit ingredient
export const updateIngredient = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const update = req.body;
  const query = { _id: itemId };
  const Item = await Ingredient.findById(itemId);
  if (!Item) {
    res.status(400);
    throw new Error("item not found");
  }
  const user = await User.findById(req.token_user._id);
  // check if user exists
  if (!user) {
    res.status(401);
    throw new Error(`User not found!`);
  }
  if (Item.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized!");
  }
  const updatedItem = await Ingredient.findOneAndUpdate(query, update, {
    new: true,
  });
  res
    .status(200)
    .json({ creatorUser: Item.user, loggedInUser: user.id, updatedItem });
});
