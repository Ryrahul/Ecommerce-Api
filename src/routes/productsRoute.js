const express = require("express");
const router = express.Router();
const {
  addProducts,
  getProducts,
  eachProduct,
  deleteProduct,
  updateProduct,
  categorizedProduct,
} = require("../controller/Product");
const auth = require("../middleware/authorization");

router.get("/product", getProducts).post("/product", addProducts);
router.get("/product/:id", eachProduct);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);
router.get("/category/product/:CategoryId", categorizedProduct);

module.exports = router;
