import express from "express";

import authMiddleWare from "../middleware/auth.js";
import { addToCart ,removeFromCart,getCart} from "../controlers/cartControler.js";


const cartRouter = express.Router();

// Add an item to the cart
cartRouter.post('/add', authMiddleWare, addToCart);

// Remove an item from the cart
cartRouter.post('/remove', authMiddleWare, removeFromCart);

// Get the cart data
cartRouter.post('/get', authMiddleWare, getCart);

export default cartRouter;
