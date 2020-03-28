const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
// eslint-disable-next-line no-unused-vars
const should = chai.should();

const server = require('../app');
const User = require('../model/schema/user');

describe('users', () => {

  beforeEach((done) => {
    const user = new User({
      username: 'Tester',
      email: 'tester@gmail.com',
      password: 'e10adc3949ba59abbe56e057f20f883e'
    });
    user.save(() => {
      done();
    });
  });
    
  afterEach((done) => {
    User.collection.drop();
    done();
  });
  it('should reister new user on /user/register POST', (done) => {
    chai.request(server)
      .post('/api/v1/user/register')
      .send({
        username: 'Test1',
        email: 'tester1@gmail.com',
        password: '123456'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        res.body.should.have.property('username');
        res.body.should.have.property('_id');
        res.body.username.should.equal('Test1');
        res.body.email.should.equal('tester1@gmail.com');
        done();
      });
  });

  it('should return err when reister if missing email or email invalid on /user/register POST', (done) => {
    chai.request(server)
      .post('/api/v1/user/register')
      .send({
        username: 'Test1',
        email: 'abc',
        password: '123456'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Email invalid');
        done();
      });
  });

  it('should return err when reister if missing username or username invalid on /user/register POST', (done) => {
    chai.request(server)
      .post('/api/v1/user/register')
      .send({
        username: 'Usernametoloonggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
        email: 'tester1@gmail.com',
        password: '123456'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Username invalid');
        done();
      });
  });

  it('should return err when reister if missing password or password invalid on /user/register POST', (done) => {
    chai.request(server)
      .post('/api/v1/user/register')
      .send({
        username: 'Test1',
        email: 'tester@gmail.com',
        password: '1'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Password invalid');
        done();
      });
  });

  it('should return err when register if email is exist on /user/register POST', (done) => {
    chai.request(server)
      .post('/api/v1/user/register')
      .send({
        username: 'Tester1',
        email: 'tester@gmail.com',
        password: '123456'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Email is exist');
        done();
      });
  });

  it('should login on /user/login POST', (done) => {
    chai.request(server)
      .post('/api/v1/user/login')
      .send({
        email: 'tester@gmail.com',
        password: 'e10adc3949ba59abbe56e057f20f883e'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        res.body.should.have.property('username');
        res.body.should.have.property('accessToken');
        res.body.should.have.property('refreshToken');
        res.body.should.have.property('id');
        res.body.email.should.equal('tester@gmail.com');
        res.body.username.should.equal('Tester');
        done();
      });
  });

  it('should return err when login if missing email or email invalid on /user/login POST', (done) => {
    chai.request(server)
      .post('/api/v1/user/login')
      .send({
        email: 'abc',
        password: 'e10adc3949ba59abbe56e057f20f883e'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Email invalid');
        done();
      });
  });

  it('should return err when login if missing password or password invalid on /user/login POST', (done) => {
    chai.request(server)
      .post('/api/v1/user/login')
      .send({
        email: 'tester@gmail.com',
        password: '1'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Password invalid');
        done();
      });
  });

});
