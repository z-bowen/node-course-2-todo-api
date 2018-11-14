const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User, secret} = require('./../../models/user');

const todos = [{
  _id: new ObjectID(),
  text: 'first test todo'
},
{
  _id: new ObjectID(),
  text: 'second test todo',
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

var user1Id = new ObjectID();
var user2Id = new ObjectID();

const users = [{
  _id: user1Id,
  email: 'user1@test.com',
  password: 'user1Pass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: user1Id, access: 'auth'}, secret).toString()
  }]
}, {
  _id: user2Id,
  email: 'user2@test.com',
  password: 'user2Pass'
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var user1 = new User(users[0]).save().then();
    var user2 = new User(users[1]).save().then();

    return Promise.all([user1, user2]);
  }).then(done());
};

module.exports = {todos, users, populateTodos, populateUsers};
