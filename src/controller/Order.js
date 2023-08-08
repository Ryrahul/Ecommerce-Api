const Cart = require("../../db/models/CartSchema");
const Order = require("../../db/models/OrderSchema");
const User = require("../../db/models/UserSchema");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const addToOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const cart = await Cart.findOne({ user: _id }).populate("items.product");
    if (!cart) {
      return res.status(400).json({ message: "Could not find Cart for you" });
    }
    let totalAmount = 0;
    const user = await User.findById(_id);
    console.log(user.address);

    if (cart.items.length < 1) {
      return res.status(200).send("Nothing in cart");
    }

    const orderItems = cart.items.map((items) => {
      totalAmount += items.product.price * items.quantity;
      return {
        product: items.product,
        quantity: items.quantity,

        totalAmount,
        shippingAddress: user.address,
        paymentStatus: "Pending",
      };
    });
    const grandTotal = orderItems.reduce(
      (total, item) => total + totalAmount,
      0
    );
    const amountInSmallest = totalAmount * 100;
    const razorPayorder = await razorpay.orders.create({
      amount: amountInSmallest,
      currency: "INR",
    });
    console.log(razorPayorder);

    const order = new Order({
      user: _id,
      items: orderItems,
    });
    await order.save();
    // cart.items = [];

    await cart.save();
    const paymentLink = `localhost${process.env.PORT}:/api/order/checkout/:${razorPayorder.id}`;
    console.log(paymentLink);
    res.json({
      message: "Order placed successfully",
      order,
      grandTotal,
      paymentlink: paymentLink,
    });
  } catch (e) {
    res.status(401).send(e.message);
  }
};
module.exports = addToOrder;
