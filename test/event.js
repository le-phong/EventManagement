const chai = require('chai');
const chaiHttp = require('chai-http');
// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

const server = require('../app');

const User = require('../model/schema/user');
const Event = require('../model/schema/event');


const email = `tester${Date.now()}@gmail.com`;
let token = '';
let userId = '';

describe('events', () => {
  before((done) => {
    const user = new User({
      username: 'Tester',
      email: email,
      password: 'e10adc3949ba59abbe56e057f20f883e'
    });
    user.save((err, data) => {
      chai.request(server)
        .post('/api/v1/user/login')
        .send({
          email: data.email,
          password: data.password
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          userId = res.body.id;
          token = res.body.accessToken;
          done();
        });
    });
  });

  beforeEach((done) => {
    const event = new Event({
      userId,
      name: 'Test',
      description: 'Test description',
      startDate: '2020-04-01T10:00:00.000Z',
      dueDate: '2020-04-02T10:00:00.000Z'
    });
    event.save(() => {
      done();
    });
  });

  afterEach((done) => {
    Event.collection.drop();
    done();
  });

  after((done) => {
    User.deleteOne({
      _id: userId
    }, () => {
      done();
    });
  });

  it('should add a event on /event POST', (done) => {
    chai.request(server)
      .post('/api/v1/event')
      .set('token', token)
      .send({
        name: 'Test1',
        description: 'Test1 description',
        startDate: '2020-05-01T10:00:00.000Z',
        dueDate: '2020-05-02T10:00:00.000Z'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body.should.have.property('startDate');
        res.body.should.have.property('dueDate');
        res.body.should.have.property('_id');
        res.body.name.should.equal('Test1');
        res.body.description.should.equal('Test1 description');
        res.body.startDate.should.equal('2020-05-01T10:00:00.000Z');
        res.body.dueDate.should.equal('2020-05-02T10:00:00.000Z');
        done();
      });
  });

  it('shoud return err when create event if missing startDate or startDate invalid format on /event POST', (done) => {
    chai.request(server)
      .post('/api/v1/event')
      .set('token', token)
      .send({
        name: 'Test1',
        description: 'Test1 description',
        dueDate: '2020-05-02T10:00:00.000Z'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Start date invalid');
        done();
      });
  });

  it('shoud return err when create event if missing dueDate or dueDate invalid format on /event POST', (done) => {
    chai.request(server)
      .post('/api/v1/event')
      .set('token', token)
      .send({
        name: 'Test1',
        description: 'Test1 description',
        startDate: '2020-05-02T10:00:00.000Z'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Due date invalid');
        done();
      });
  });

  it('shoud return err when create event if dueDate is before startDate /event POST', (done) => {
    chai.request(server)
      .post('/api/v1/event')
      .set('token', token)
      .send({
        name: 'Test1',
        description: 'Test1 description',
        startDate: '2020-05-02T10:00:00.000Z',
        dueDate: '2020-04-02T10:00:00.000Z'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('The due date is before the start date');
        done();
      });
  });

  it('should list ALL events on /event GET', (done) => {
    chai.request(server)
      .get('/api/v1/event')
      .set('token', token)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('startDate');
        res.body[0].should.have.property('dueDate');
        done();
      });
  });

  it('should list ALL events ended on /event GET', (done) => {
    const event = new Event({
      userId,
      name: 'Test',
      description: 'Test description',
      startDate: '2020-03-01T10:00:00.000Z',
      dueDate: '2020-03-02T10:00:00.000Z'
    });
    event.save((err, data) => {
      if (err || !data) {
        done();
      } else {
        chai.request(server)
          .get('/api/v1/event?status=1')
          .set('token', token)
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('startDate');
            res.body[0].should.have.property('dueDate');
            res.body[0].dueDate.should.below(new Date().toISOString());
            done();
          });
      }
    });
  });

  it('should get event on /event GET', (done) => {
    const event = new Event({
      userId,
      name: 'Test',
      description: 'Test description',
      startDate: '2020-05-01T10:00:00.000Z',
      dueDate: '2020-05-02T10:00:00.000Z'
    });
    event.save((err, data) => {
      if (err || !data) {
        done();
      } else {
        chai.request(server)
          .get(`/api/v1/event/${data._id}`)
          .set('token', token)
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('description');
            res.body.should.have.property('startDate');
            res.body.should.have.property('dueDate');
            res.body.should.have.property('_id');
            res.body.name.should.equal('Test');
            res.body.description.should.equal('Test description');
            res.body.startDate.should.equal('2020-05-01T10:00:00.000Z');
            res.body.dueDate.should.equal('2020-05-02T10:00:00.000Z');
            done();
          });
      }
    });
  });

  it('should update event on /event PUT', (done) => {
    const event = new Event({
      userId,
      name: 'Test',
      description: 'Test description',
      startDate: '2020-05-01T10:00:00.000Z',
      dueDate: '2020-05-02T10:00:00.000Z'
    });
    event.save((err, data) => {
      if (err || !data) {
        done();
      } else {
        chai.request(server)
          .put('/api/v1/event')
          .set('token', token)
          .send({
            id: data._id,
            name: 'Update',
            description: 'Description update',
            startDate: '2020-06-01T10:00:00.000Z',
            dueDate: '2020-06-02T10:00:00.000Z'
          })
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('description');
            res.body.should.have.property('startDate');
            res.body.should.have.property('dueDate');
            res.body.should.have.property('_id');
            res.body.name.should.equal('Update');
            res.body.description.should.equal('Description update');
            res.body.startDate.should.equal('2020-06-01T10:00:00.000Z');
            res.body.dueDate.should.equal('2020-06-02T10:00:00.000Z');
            done();
          });
      }
    });
  });

  it('should return error when update event if event not exist on /event PUT', (done) => {
    chai.request(server)
      .put('/api/v1/event')
      .set('token', token)
      .send({
        id: '5e7f0a4abf6ab063443af75b',
        name: 'Update',
        description: 'Description update',
        startDate: '2020-06-01T10:00:00.000Z',
        dueDate: '2020-06-02T10:00:00.000Z'
      })
      .end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Event is not exist');
        done();
      });
  });

  it('should return error when update event if new due date is before new start date on /event PUT', (done) => {
    const event = new Event({
      userId,
      name: 'Test',
      description: 'Test description',
      startDate: '2020-05-01T10:00:00.000Z',
      dueDate: '2020-05-02T10:00:00.000Z'
    });
    event.save((err, data) => {
      if (err || !data) {
        done();
      } else {
        chai.request(server)
          .put('/api/v1/event')
          .set('token', token)
          .send({
            id: data._id,
            name: 'Update',
            description: 'Description update',
            startDate: '2020-06-01T10:00:00.000Z'
          })
          .end(function (err, res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('The due date is before the start date');
            done();
          });
      }});
  });

  it('should delte event on /event DELETE', (done) => {
    const event = new Event({
      userId,
      name: 'Test',
      description: 'Test description',
      startDate: '2020-05-01T10:00:00.000Z',
      dueDate: '2020-05-02T10:00:00.000Z'
    });
    event.save((err, data) => {
      if (err || !data) {
        done();
      } else {
        chai.request(server)
          .delete('/api/v1/event')
          .set('token', token)
          .send({
            id: data._id
          })
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Delete event success');
            done();
          });
      }});
  });

  it('should return err if missing event id on /event DELETE', (done) => {
    const event = new Event({
      userId,
      name: 'Test',
      description: 'Test description',
      startDate: '2020-05-01T10:00:00.000Z',
      dueDate: '2020-05-02T10:00:00.000Z'
    });
    event.save((err, data) => {
      if (err || !data) {
        done();
      } else {
        chai.request(server)
          .delete('/api/v1/event')
          .set('token', token)
          .send({})
          .end(function (err, res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Id invalid');
            done();
          });
      }});
  });

});
