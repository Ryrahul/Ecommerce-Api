const Product = require('../../db/models/productsSchema')
const addProducts = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (e) {
    res.status(401).send(e.message);
  }
};
const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).send(allProducts);
  } catch (e) {
    res.status(401).send(e.message);
  }
};
const eachProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const requiredProduct = await Product.findById(id);
    res.status(200).send(requiredProduct);
  } catch (e) {
    res.status(401).send(e.message);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).send(`deleted->>${deletedProduct}`);
  } catch (e) {
    res.status(401).send(e.message);
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const availableProduct = await Product.findById(id);
    if (!availableProduct) {
      res.status(200).send("no such products");
    }
    await Product.findByIdAndUpdate(id, update);
    res.status(200).send(update);
  } catch (e) {
    res.status(401).send(e.message);
  }
};
const categorizedProduct = async (req, res) => {
  CategoryId = req.params.CategoryId;
  console.log(CategoryId);
  try {
    const categoryProducts = await Product.find({ category: CategoryId });
    if(!categoryProducts){
        return res.status(401).send("no such products")
    }
    return res.status(200).send(categoryProducts);
  } catch (e) {
    res.status(401).send(e.message);
  }

  res.send("working");
};
module.exports = {
  addProducts,
  getProducts,
  eachProduct,
  deleteProduct,
  updateProduct,
  categorizedProduct,
};
