const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token " });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "Verification failed" });
    }
    req.user = decoded;
    next();
  });
};
module.exports = auth;
