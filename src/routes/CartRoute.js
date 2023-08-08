const express = require("express");
const router = express.Router();
const { addToCart, getCart, updateCart } = require("../controller/Cart");
const auth = require("../middleware/authorization");

router.post("/items", auth, addToCart);
router.get("/items", auth, getCart);
router.put("/items", auth, updateCart);
module.exports = router;
