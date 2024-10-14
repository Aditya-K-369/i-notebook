const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("Token not provided");
    return res.status(401).json({ message: "Access denied. Please login first." });
  }

  try {
    const decoded = jwt.verify(token, "shhh");
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(400).json({ message: "Invalid token." });
  }
};
