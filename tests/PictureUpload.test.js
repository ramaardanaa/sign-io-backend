const request = require('supertest');
const app = require('../app');

let token;

beforeAll(done => {
  request(app)
    .post('/users/login')
    .send({
      email: 'admin@mail.com',
      password: '1234'
    })
    .then(res => done())
    .catch(err => console.log(err))
})

describe('Test endpoint /users/upload', () => {
  it('Test upload success', (done) => {
  })
})