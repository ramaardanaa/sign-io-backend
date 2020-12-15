const jwt = require('jsonwebtoken');
require("dotenv").config();

function signToken(payload) {
  const token = jwt.sign(payload, process.env.JWT);
  return token;
}

function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.JWT);
  return decoded;
}

module.exports = {
  signToken,
  verifyToken
}