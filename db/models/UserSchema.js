const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.statics.comparePassword = async function (email, password) {
  const person = await User.findOne({ email });
  if (!person) {
    throw Error("Email not matched or not registered");
  }
  const match = await bcrypt.compare(password, person.password);
  if (match) {
    return person;
  } else {
    throw Error("Password did not match");
  }
};
const User = mongoose.model("User", userSchema);
module.exports = User;
