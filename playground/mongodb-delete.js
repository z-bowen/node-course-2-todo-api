// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Failed to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  db.collection('Users').deleteMany({
    name: 'Zach'
  }).then((resp) => {
    console.log('Succeeded deleting users,', resp);
  }, (err)=> {
    console.log('Error deleting users,', err);
  })
  // db.collection('Users').find({
  //   name: 'Leslie'
  // }).toArray().then((resp) => {
  //   console.log(resp);
  //   db.collection('Users').findOneAndDelete({
  //     _id: resp[0]._id
  //   })
  // }, (err) => {
  //   console.log('Error fetching user: ', err);
  // }).then((resp) => {
  //   console.log(resp);
  // }, () => {
  //   console.log('Error deleting user, ', err);
  // });
  // deleteMany
  // db.collection('Todos').deleteMany({
  //   text: 'Eat lunch'
  // }).then((result) => {
  //   console.log(result);
  //   db.close();
  // }, (err) => {
  //   console.log('Error deleting records,', err);
  // });
  //
  // // deleteOne
  // db.collection('Todos').deleteOne({
  //   text: 'Walk the dog'
  // }).then((result) => {
  //   console.log('Deleted document');
  //   console.log(result);
  // }, (err) => {
  //   console.log('Error deleting document,', err);
  // });
  //
  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({
  //   completed: false
  // }).then((response) => {
  //   console.log(JSON.stringify(response, undefined, 2));
  // }, (err) => {
  //   console.log('Error deleting document,' , err);
  // });

  // db.close();
});
