
const jwt = require('jsonwebtoken');
const SECRETKEY = "MAMA";

function jsonWebToken(param) {
//   console.log(param)
  const access_token = jwt.sign({ id: param.dataValues.id, email: param.dataValues.email ,role: param.dataValues.role}, SECRETKEY);

	return access_token
}

module.exports = jsonWebToken;
