const express = require("express");
const app = express();
port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("../db/conn");
const router = require("../routes/productsRoute");
const { urlencoded } = require("body-parser");

app.use("/api", router);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
