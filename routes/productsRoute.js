const express = require("express");
const router = express.Router();
const { category, deleteCategory } = require("../controller/Category");
const {
  addProducts,
  getProducts,
  eachProduct,
  deleteProduct,
  updateProduct,
  categorizedProduct,
} = require("../controller/Product");
const { signup, login } = require("../controller/Auth");
const { addToCart, getCart, updateCart } = require("../controller/Cart");
const auth = require("../middleware/authorization");
const addToOrder = require("../controller/Order");

router.post("/categories", category);
router.delete("/dlt/categories/:id", deleteCategory);

router.get("/product", getProducts).post("/product", addProducts);
router.get("/product/:id", eachProduct);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);
router.get("/category/product/:CategoryId", categorizedProduct);
router.post("/signup", signup);
router.post("/login", login);
router.post("/cart", auth, addToCart);
router.get("/cart", auth, getCart);
router.put("/cart", auth, updateCart);
router.post("/order", addToOrder);

module.exports = router;
