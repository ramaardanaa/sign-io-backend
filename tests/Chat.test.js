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

describe('Test endpoint /chats', () => {
  describe('Test endpoint POST', () => {
    it('Test create chats success', (done) => {
      request(app)
        .post('/chats')
        .set({
          access_token: token
        })
        .send({
          message: "haii",
          RoomId: RoomId
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(201)
          expect(body).toHaveProperty('id', expect.any(Number))
          done()
        })
        .catch(err => console.log(err))
    })

    it('Test create chats no access token', (done) => {
      request(app)
        .post('/chats')
        .set({
          access_token: ''
        })
        .send({
          message: "haii",
          RoomId: RoomId
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'Authentication Failed')
          done()
        })
        .catch(err => console.log(err))
    })
  })
})