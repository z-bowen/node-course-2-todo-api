const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

var id = '5be8748b20fd4be43226c49b';

if (!ObjectID.isValid(id)) {
  return console.log('Id not valid');
}
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo: ', todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo: ', todo);
// }).catch((e) => {console.log(e)});

User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found');
  }

  console.log('User: ', user);
}).catch((e) => console.log(e));
