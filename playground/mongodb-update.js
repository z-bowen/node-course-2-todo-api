// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Failed to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  // findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate(
  //   {
  //     _id: new ObjectID("5be866aa84b5e21094d81296")
  //   }, {
  //     $set: {
  //     completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }
  // ).then((success) => {
  //   console.log(success);
  // }, (failure) => {
  //   console.log(failure);
  // })

  // $inc
  db.collection('Users').findOneAndUpdate(
    {
      _id: new ObjectID("5be855b68944471b3b5867a6")
    }, {
      $inc: {
        age: -1
      }
    }, {
      returnOriginal: false
    }
  ).then((result) => {
    console.log(result);
  }, (error) => {
    console.log(error);
  })

  // db.close();
});
