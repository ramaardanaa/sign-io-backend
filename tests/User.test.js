const { sequelize } = require('../models');
const { queryInterface } = sequelize;

const request = require('supertest');
const app = require('../app');

let token;

beforeAll((done) => {
  queryInterface.bulkDelete('Users')
    .then(() => {
      done()
    })
    .catch(err => {
      done()
    })
})

describe('Test endpoint /users', () => {
  describe('Test Endpoint POST users/register', () => {
    it('test register Success', (done) => {
      request(app)
      .post('/users/register')
      .send({
        name: 'admin',
        email: 'admin@mail.com',
        password: '1234',
        profile_picture: `https://ui-avatars.com/api/?name=&rounded=true&background=random`
      })
      .then(response => {
        const { body, status } = response;
  
        expect(status).toEqual(201);
        expect(body).toHaveProperty('id', expect.any(Number));
        expect(body).toHaveProperty('email', 'admin@mail.com');
        done()
      })
    })
  
    it('test register form empty', (done) => {
      request(app)
      .post('/users/register')
      .send({
        name: '',
        email: '',
        password: ''
      })
      .then(response => {
        const { body, status } = response;
  
        expect(status).toEqual(400);
        expect(body).toHaveProperty("msg", "Name is required, Email is required, Password is required")
        done()
      })
    })
  })
  
  describe('Test Endpoint POST users/login', () => {
    it('test login Success', (done) => {
      request(app)
      .post('/users/login')
      .send({
        email: 'admin@mail.com',
        password: '1234'
      })
      .then(response => {
        const { body, status } = response;

        token = body.access_token

        expect(status).toEqual(200);
        expect(body).toHaveProperty('access_token', expect.any(String));
        done()
      })
    })
  
    it('test login wrong email/password null', (done) => {
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
  
    it('test login wrong email', (done) => {
      request(app)
      .post('/users/login')
      .send({
        email: 'adminnnn@mail.com',
        password: '1234'
      })
      .then(response => {
        const { body, status } = response;
  
        expect(status).toEqual(401);
        expect(body).toHaveProperty("msg", "wrong email/password")
        done()
      })
    })
  })

  describe('Test Endpoint PUT users/edit/:id', () => {
    it('test update success', (done) => {
      request(app)
        .put('/users/edit')
        .set({
          access_token: token
        })
        .send({
          name: 'test',
          profile_picture: 'tesst.png'
        })
        .then(response => {
          const { body, status } = response;
          
          done()
        })
    })

    it('test update failed', (done) => {
      request(app)
        .put('/users/edit')
        .set({
          access_token: token
        })
        .send({
          name: '',
          profile_picture: ''
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toEqual(400);
          expect(body).toHaveProperty("msg", "Name is required")
          done()
        })
    })
  })
})