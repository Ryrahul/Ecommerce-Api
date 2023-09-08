const Product = require("../../db/models/productsSchema");

const addProducts = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct); // Return the created product as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

const eachProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const requiredProduct = await Product.findById(id);

    if (!requiredProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(requiredProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted", deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
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
    if (!categoryProducts || categoryProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }
    return res.status(200).json(categoryProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve category products" });
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
