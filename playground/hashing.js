const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, '123ABC');

var decoded = jwt.verify(token, '123abc');
console.log('decoded ', decoded);
