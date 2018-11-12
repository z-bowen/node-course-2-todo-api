const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo');

const todos = [{
  text: 'first test todo'
},
{
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

  it('should get a single todo given the ID as a parameter', (done) => {
    Todo.findOne().then((doc) => {
      return doc;
    }).then((doc) => {
      request(app)
        .get(`/todos/${doc._id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toBe(doc._id.toString());
        })
        .end(done);
    }).catch((e) => {done(e)});
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
  })
});
