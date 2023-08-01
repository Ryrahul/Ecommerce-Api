const Category = require("../../db/models/Category.Schema")
const Product = require("../../db/models/productsSchema")


const category = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (e) {
    res.send(e.message);
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  console.log(category);
  res.send(`removed ->>${category}`);
};
module.exports = { category, deleteCategory };
