const jwt = require('jsonwebtoken');

function signToken(payload) {
  const token = jwt.sign(payload, 'rahasia');
  return token;
}

function verifyToken(token) {
  const decoded = jwt.verify(token, 'rahasia');
  return decoded;
}

module.exports = {
  signToken,
  verifyToken
}