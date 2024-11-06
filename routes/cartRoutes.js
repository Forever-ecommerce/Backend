import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
  removeCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/get", authUser, getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/remove", authUser, removeCart);

export default cartRouter;
