const express = require("express");
const router = express.Router();
const { addToCart, getCart, updateCart } = require("../controller/Cart");
const auth = require("../middleware/authorization");

router.post("/cart", auth, addToCart);
router.get("/cart", auth, getCart);
router.put("/cart", auth, updateCart);
module.exports = router;
