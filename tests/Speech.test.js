const request = require('supertest');
const app = require('../app');

describe('Test Endpoint /speech', () => {
  describe('Test Endpoint POST /speech', () => {
    it('test post speech', (done) => {
      request(app)
        .post('/speech')
        .send({
          filename: "Nz.m4a"
        })
        .then(response => {
          const { body, status } = response;
          console.log(body, 'testing body speech')
          done()
        })
    })
  })
})