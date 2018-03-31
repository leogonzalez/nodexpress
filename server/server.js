require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user')

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }).catch((e) => {
    res.status(400).send(e)
  });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send('Not found');
  }

  Todo.findById({_id:req.params['id']}).then((todo) => {
    res.send(todo);
  }).catch((e) => {
    res.status(404).send('Not found')
  });
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(404).send('Not found');
    return res.end();
  }
  Todo.findByIdAndRemove({_id:req.params['id']}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
    res.status(404).send('Not found')
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = (({text, completed}) => {
    return {
      text,
      completed: Boolean(completed)
    };
  })(req.body);
  if (body.completed) {
    body.completedAt= new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(404).send();
  })
});

app.listen(port, () => {
  console.log('Started on port 3000');
});

module.exports = {
  app
};
