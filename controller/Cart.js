const Cart = require("../db/models/CartSchema");
const Product = require("../db/models/productsSchema");

const addToCart = async (req, res) => {
  const id = req.user._id;
  console.log(id);
  console.log(id);
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(401).send("No such product found");
    }
    let cart = await Cart.findOne({ user: id });
    if (!cart) {
      cart = new Cart({ user: id, items: [] });
    }
    const existingItem = cart.items.find((item) =>
      item.product.equals(productId)
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity,
        details: product,
      });
    }
    await cart.save();
    res.json(cart);
  } catch (e) {
    res.status(401).send(e.message);
  }
};
const updateCart = async (req, res) => {
  const id = req.user._id;
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  const cart = await Cart.findOne({ user: id });
  cartItems = cart.items.find((item) => item.product);
  if (quantity && quantity > 0) {
    cartItems.quantity = quantity;
  }
  await cart.save();
  res.json(cart);
};
const getCart = async (req, res) => {
    try{
  id = req.user._id;
  const availableCart = await Cart.findOne({ user: id });
  if(!availableCart){
    res.status(401).send("Nothing in Cart")
  }
  res.status(200).send(availableCart);
    }
    catch(e){

    }
};
module.exports = {addToCart,getCart,updateCart};
