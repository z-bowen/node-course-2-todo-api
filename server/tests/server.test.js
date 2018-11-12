const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'first test todo'
},
{
  _id: new ObjectID(),
  text: 'second test todo'
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text)
          .toBeA('string')
          .toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should reject invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({text: '  '})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get the todos from the db', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
        expect(res.body.todos[0].text).toBe('first test todo');
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should get a single todo given the ID as a parameter', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end(done);
  });

  it('should return 404 when a non-existing id is supplied', (done) => {
    var id = '000000000000000000000000'
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.error).toBe('Id not found');
      })
      .end(done);
  });

  it('should return 404 when an invalid id is supplied', (done) => {
    var id = '0'
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.error).toBe('Invalid Id');
      })
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));
    });
  });


  it('should return 404 when a non-existing id is supplied', (done) => {
    var id = '000000000000000000000000';
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.error).toBe('Id not found');
      })
      .end(done);
  });

  it('should return 404 when an invalid id is supplied', (done) => {
    var id = '0';
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.error).toBe('Invalid Id');
      })
      .end(done);
  });
});
