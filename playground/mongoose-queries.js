const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectId} = require('mongodb');

const id = '5abfadea44dd0720f3aa9d4';

if (!ObjectId.isValid(id)) {
  throw new Error('Id invalid');
}

Todo.findById({_id: id}).then((doc) => {
  console.log(doc);
}).catch((e) => {
  console.log('No found');
})
