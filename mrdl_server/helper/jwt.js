
const jwt = require('jsonwebtoken');
const SECRETKEY = "MAMA";

function jsonWebToken(param) {
     console.log(param , "++++++++++++++")
  const access_token = jwt.sign({ id: param.id, mymail: param.email ,role: param.role}, SECRETKEY);

	return access_token
}

module.exports = jsonWebToken;
