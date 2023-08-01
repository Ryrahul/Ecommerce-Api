const express = require("express");
const router = express.Router();
const addToOrder = require("../controller/Order");
const auth = require("../middleware/authorization");

router.post("/order", auth, addToOrder);
module.exports = router;
