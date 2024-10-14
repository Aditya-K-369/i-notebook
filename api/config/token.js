const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign({ email: user.email, userId: user._id }, "shhh");
  console.log(token);
  return token;
};
module.exports = generateToken;
