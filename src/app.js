const express = require("express");
const app = express();
port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("../db/conn");
const Authroute = require("../src/routes/Auth");
const Cartroute = require("../src/routes/CartRoute"); 
const CategoryRoute = require("../src/routes/CategoryRoute"); 
const OrderRoute = require("../src/routes/OrderRoute"); 
const productroute = require("../src/routes/productsRoute")
const { urlencoded } = require("body-parser");

app.use("/api", Authroute);
app.use("/api/cart", Cartroute);
app.use("/api", CategoryRoute);
app.use("/api", OrderRoute);
app.use("/api", productroute);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
