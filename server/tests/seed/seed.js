const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User, secret} = require('./../../models/user');

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
  password: 'user2Pass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: user2Id, access: 'auth'}, secret).toString()
  }]
}];

const todos = [{
  _id: new ObjectID(),
  text: 'first test todo',
  _creator: user1Id
}, {
  _id: new ObjectID(),
  text: 'second test todo',
  completed: true,
  completedAt: 333,
  _creator: user2Id
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var user1 = new User(users[0]).save();
    var user2 = new User(users[1]).save();

    return Promise.all([user1, user2]);
  }).then(() => done());
};

module.exports = {todos, users, populateTodos, populateUsers};
