const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abs';
bcrypt.genSalt(10, (err, salt) => {
  console.log(`salt`,salt);
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(`hash`,hash);
  })
})

var hashPass = '$2a$10$PGNq/jGxacfk/KYjoESC0eEwVpfPEUsEkr7oqoggMNBpWS3zU9v1a';

bcrypt.compare(password, hashPass, (err, res) => {
  console.log(`res`,res);
});

// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123ABC');
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded ', decoded);
