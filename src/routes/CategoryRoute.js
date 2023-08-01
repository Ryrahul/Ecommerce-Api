const express = require("express");
const router = express.Router();
const { category, deleteCategory } = require("../controller/Category");

router.post("/categories", category);
router.delete("/dlt/categories/:id", deleteCategory);
module.exports = router;
