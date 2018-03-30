// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

const findAllDocuments = (db, callback) => {
  const collection = db.collection('documents');
  collection.find({}).toArray((err,docs) => {
    if (err) return console.erro(err.message);
    console.log('Found docs');
    console.log(JSON.stringify(docs, undefined, 2));
    callback(docs);
  });
}

const findDocuments = (query, db, callback) => {
  const collection = db.collection('documents');
  collection.find(query).toArray((err,docs) => {
    if (err) return console.erro(err.message);
    console.log('Found docs with specific query');
    console.log(JSON.stringify(docs, undefined, 2));
    callback(docs);
  });
}

const insertDocuments = (db, callback) => {
  const collection = db.collection('documents');
  collection.insertOne({a:'leo'}, (err, res) => {
    if (err) return console.error(err.msg);
    callback();
  });
}


MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db(dbName);
  // findAllDocuments(db, () => {
  //   client.close();
  // })

  // const db = client.db(dbName);
  // insertDocuments(db, () => {
  //   client.close();
  // })

  // findDocuments({"a":'leo'},db, () => {
  //   client.close();
  // })

  findDocuments({_id: new ObjectID("5abe3469c1098d70c795a328")},db, () => {
    client.close();
  })



});
