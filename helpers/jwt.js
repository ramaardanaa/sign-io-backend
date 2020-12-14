const jwt = require('jsonwebtoken');
require("dotenv").config();

function signToken(payload) {
  const token = jwt.sign(payload, process.env.PORT);
  return token;
}

function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.PORT);
  return decoded;
}

module.exports = {
  signToken,
  verifyToken
}