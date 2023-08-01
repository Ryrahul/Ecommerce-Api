const Cart = require("../db/models/CartSchema");
const Order = require("../db/models/OrderSchema");
const User = require("../db/models/UserSchema");

const addToOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const cart = await Cart.findOne({ user: _id }).populate("items.product");
    if (!cart) {
      return res.status(400).json({ message: "Could not find Cart for you" });
    }
    let totalAmount = 0;
    const user= await User.findById(_id)
    console.log(user.address)

    
    if (cart.items.length < 1) {
      return res.status(200).send("Nothing in cart");
    }

    const orderItems = cart.items.map((items) => {
      totalAmount += items.product.price * items.quantity;
      return {
        product: items.product,
        quantity: items.quantity,

        totalAmount,
        shippingAddress:user.address,
        paymentStatus: "Pending",
      };
    });
    const grandTotal = orderItems.reduce(
      (total, item) => total + totalAmount,
      0
    );

    const order = new Order({
      user: _id,
      items: orderItems,
    });
    await order.save();
    cart.items = [];

    await cart.save();

    res.json({ message: "Order placed successfully", order, grandTotal });
  } catch (e) {
    res.status(401).send(e.message);
  }
};
module.exports = addToOrder;
