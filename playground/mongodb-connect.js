// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Failed to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Failed writing to Todo collection: ', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  //
  // db.collection('Users').insertOne({
  //   name: 'Zach',
  //   age: 38,
  //   location: 'Berlin'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Failed writing to Users');
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2), result.ops[0]._id.getTimestamp());
  // })

  db.close();
});
