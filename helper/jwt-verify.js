const jwt = require('jsonwebtoken');

const SECRETKEY = "MAMA";

function jsonWebTokenVerify(param){
  return jwt.verify(param, SECRETKEY);
}


module.exports = jsonWebTokenVerify