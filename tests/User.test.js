const { sequelize } = require('../models');
const { queryInterface } = sequelize;

const request = require('supertest');
const app = require('../app');

beforeAll((done) => {
  queryInterface.bulkDelete('Users')
    .then(() => {
      done()
    })
    .catch(err => {
      done()
    })
})

describe('Test Endpoint POST users/register', () => {
  //sukses register
  it('test register Success', (done) => {
    request(app)
    .post('/users/register')
    .send({
      name: 'admin',
      email: 'admin@mail.com',
      password: '1234'
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(201);
      expect(body).toHaveProperty('id', expect.any(Number));
      expect(body).toHaveProperty('email', 'admin@mail.com');
      done()
    })
  })

  //gagal register
  it.only('test register form empty', (done) => {
    request(app)
    .post('/users/register')
    .send({
      name: '',
      email: '',
      password: ''
    })
    .then(response => {
      const { body, status } = response;

      console.log(body, '<<<<<ini body');
      console.log(status, '<<<<ini status');

      // expect(status).toEqual(500);
      // expect(body).toHaveProperty("msg", "name, email & password not null")
      done()
    })
  })
})

describe('Test Endpoint POST users/login', () => {
  // sukses login
  it('test login Success', (done) => {
    request(app)
    .post('/users/login')
    .send({
      email: 'admin@mail.com',
      password: '1234'
    })
    .then(response => {
      const { body, status } = response;
      expect(status).toEqual(200);
      expect(body).toHaveProperty('access_token', expect.any(String));
      done()
    })
  })

  //gagal login (email ada, password salah)
  it('test login wrong password', (done) => {
    request(app)
    .post('/users/login')
    .send({
      email: 'admin@mail.com',
      password: '123456'
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty("msg", "wrong email/password")
      done()
    })
  })

  //gagal login (email tidak terdaftar)
  it('test login wrong email', (done) => {
    request(app)
    .post('/users/login')
    .send({
      email: 'admin@mail.com',
      password: '12345'
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty("msg", "wrong email/password")
      done()
    })
  })

  // gagal login (email/password kosong)
  it('test login form empty', (done) => {
    request(app)
    .post('/users/login')
    .send({
      email: '',
      password: ''
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(404);
      expect(body).toHaveProperty("msg", "email/password not null")
      done()
    })
  })
})




