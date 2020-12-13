const bcrypt = require('bcryptjs');

function hashPass(pass) {
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(pass, salt);

  return hash;
}

function comparePass(pass, hash) {
  return bcrypt.compareSync(pass, hash);
}

module.exports = {
  hashPass,
  comparePass
}