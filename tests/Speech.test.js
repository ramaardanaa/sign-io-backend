const request = require('supertest');
const app = require('../app');
const fs = require('fs');
const filePath = `${__dirname}/data-temp/audio-test/Nz.m4a`

describe('Test Endpoint /speech', () => {
  describe('Test Endpoint POST /speech', () => {
    it('test post speech', (done) => {
      
      request(app)
        .post('/speech')
        .attach(
          'file', filePath
        )
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(200)
          expect(body).toHaveProperty('transcription', expect.any(String))
          done()
        })
    })
  })
})