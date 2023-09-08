const User = require("../../db/models/UserSchema");
const createToken = require("../middleware/jwt");

const signup = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    token = createToken({ _id: newUser._id, name: newUser.name });
    console.log(token);
    return res.status(200).send(token);
  } catch (e) {
    console.error(e);
    res.status(401).send(e.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const person = await User.comparePassword(email, password);

    const token = createToken({ _id: person._id, name: person.name });
    return res.status(200).json({ message: "Success", token: token });
  } catch (e) {
    console.error(e);
    res.status(401).send("Failed to login");
  }
};
module.exports = { signup, login };
