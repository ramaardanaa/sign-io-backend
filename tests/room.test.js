const request = require('supertest')
const { sequelize } = require('../models')
// const { queryInterface } = sequelize
const app;

let access_token;


describe('Test endpoint /rooms', () => {
  describe('Test endpoint GET', () => {
    it('Test get rooms success', (done) => {
      request(app)
        .get('/rooms')
        .set({ access_token })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('name', expect.any(String))
          done()
        })
        .catch(err => console.log(err))
    })
    
    it('Test get rooms no access token', (done) => {
      request(app)
        .get('/rooms')
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'Authentication failed')
          done()
        })
        .catch(err => console.log(err))
    })
  })

  describe('Test endpoint POST', () => {
    it('Test create rooms success', (done) => {
      request(app)
        .post('/rooms')
        .set(access_token)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('name', expect.any(String))
          done()
        })
        .catch(err => console.log(err))
    })

    it('Test create rooms no access token', (done) => {
      request(app)
        .post('/rooms')
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'Authentication failed')
          done()
        })
        .catch(err => console.log(err))
    })

    it('Test create rooms name is required', (done) => {
      request(app)
        .post('/rooms')
        .set(access_token)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('msg', 'Name is required')
          done()
        })
        .catch(err => console.log(err))
    })
  })

  describe('Test endpoint DELETE', () => {
    it('Test delete rooms success', (done) => {
      request(app)
        .delete('/rooms')
        .set(access_token)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('msg', 'Room has been deleted')
          done()
        })
        .catch(err => console.log(err))
    })

    it('Test delete rooms no access token', (done) => {
      request(app)
        .delete('/rooms')
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'Authentication failed')
          done()
        })
        .catch(err => console.log(err))
    })

    it('Test delete rooms not authorizaed user', (done) => {
      request(app)
        .delete('/rooms')
        .set(access_token)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'Authorization failed')
          done()
        })
        .catch(err => console.log(err))
    })
  })
})