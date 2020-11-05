const bcrypt = require('bcrypt')
let salt = bcrypt.genSaltSync(10);

function hashPas(password){

  return bcrypt.hashSync(password, salt);
  
}

module.exports = hashPas


