// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Failed to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  db.collection('Users').find({
    name: 'Zach'
  }).toArray().then((docs) => {
    console.log(`Users named Zach`);
    console.log(JSON.stringify(docs, undefined, 2));
    db.close();
  }, (err) => {
    console.log('Unable to fetch Todos', err);
  });

  // db.close();
});
