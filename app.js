const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/leonardo')

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', () => {
  console.log(`We're connected`);
});

const kittySchema = mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function() {
  let greeting = this.name ? `Meow name is ${this.name}` : `I don't have a name`;
  console.log(greeting);
}

const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({name: 'Silence'});
console.log(silence.name);
silence.speak();

silence.save((err, silence) => {
  silence.speak();
})
