const request = require('supertest');
const app = require('../app');

let token;

beforeAll((done) => {
  request(app)
    .post('/users/login')
    .send({
      email: 'admin@mail.com',
      password: '1234'
    })
    .then(response => {
      const { body } = response;
      token = body.access_token;
      done()
    })
})

describe('Test Endpoint /friends', () => {
  describe('Test endpoint GET', () => {
    it('Test get friends success', (done) => {
      request(app)
        .get('/friends')
        .set({ access_token : token })
        .then(response => {
          const { body, status } = response
          // expect(status).toBe(200)
          // expect(body).toHaveProperty('name', expect.any(String))
          done()
        })
        .catch(err => console.log(err))
    })
    
    it('Test get friends no access token', (done) => {
      request(app)
        .get('/friends')
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'Authentication Failed')
          done()
        })
        .catch(err => console.log(err))
    })
  })

  describe('Test endpoint POST', () => {
    it('Test create friends success', (done) => {
      request(app)
        .post('/friends')
        .set({
          access_token: token
        })
        .send({
          owner: '1',
          friend: '2'
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('owner', '1')
          expect(body).toHaveProperty('friend', '2')
          done()
        })
        .catch(err => console.log(err))
    })

    it('Test create friends no access token', (done) => {
      request(app)
        .post('/friends')
        .send({
          owner: '1',
          friend: '2'
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'Authentication Failed')
          done()
        })
        .catch(err => console.log(err))
    })

    it('Test create friends friend is required', (done) => {
      request(app)
        .post('/friends')
        .set({
          access_token: token
        })
        .send({
          owner: '1',
          friend: ''
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', 'friend is required')
          done()
        })
        .catch(err => console.log(err))
    })
  })


})