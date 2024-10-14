const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const generateToken = require("../config/token");
const middleware = require("../middlewares/middleware");

router.use(cookieParser());

router.get("/", (req, res) => {
  res.send("API is working");
});

// User Creation
router.post("/create", async (req, res) => {
  const { email, phoneNo, userName, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please sign in." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      phoneNo,
      userName,
      password: hashedPassword,
    });

    const token = generateToken(user);
    res.cookie("token", token); // Secure the cookie
    console.log(req.cookies.token)
    console.log(token);
    return res.status(201).json({token}); // Send the created user
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." ,user});
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = generateToken(user);
    console.log(token);
    res.cookie("token", token);
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

// router.post("/login", (req, res) => {
//   res.json({ message: "this is a message" });
// });

router.post("/logout",middleware, (req, res) => {

  console.log("mesage");
  res.clearCookie("token"); // Clear the cookie properly
  return res.json({ message: "Logged out successfully." });
});

module.exports = router;
