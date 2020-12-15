const request = require('supertest');
const app = require('../app');

let token;
let RoomId;

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
      return request(app).post('/rooms').set({
        access_token: token
      }).send({
        name: "rooms private"
      })
    })
    .then(res => {
      RoomId = res.body.id
      done()
    })
    .catch(console.log)
})


describe('Test endpoint /rooms', () => {
  describe('Test endpoint GET', () => {
    it('Test get rooms success', (done) => {
      request(app)
        .get('/rooms')
        .set({ access_token : token })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(200)
          expect(body[0]).toHaveProperty('name', expect.any(String))
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
          expect(body).toHaveProperty('msg', 'Authentication Failed')
          done()
        })
        .catch(err => console.log(err))
    })
  })

  describe('Test endpoint POST', () => {
    it('Test create rooms success', (done) => {
      request(app)
        .post('/rooms')
        .set({
          access_token: token
        })
        .send({
          name: "rooms private"
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('name', 'rooms private')
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
          expect(body).toHaveProperty('msg', 'Authentication Failed')
          done()
        })
        .catch(err => console.log(err))
    })

    it('Test create rooms name is required', (done) => {
      request(app)
        .post('/rooms')
        .set({
          access_token: token
        })
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
        .delete(`/rooms/${RoomId}`)
        .set({
          access_token: token
        })
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
        .delete(`/rooms/${RoomId}`)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'Authentication Failed')
          done()
        })
        .catch(err => console.log(err))
    })

    // it('Test delete rooms not authorizaed user', (done) => {
    //   request(app)
    //     .delete('/rooms/2')
    //     .set({
    //       access_token: token
    //     })
    //     .then(response => {
    //       const { body, status } = response
    //       expect(status).toBe(401)
    //       expect(body).toHaveProperty('msg', 'Authorization failed')
    //       done()
    //     })
    //     .catch(err => console.log(err))
    // })
  })
})