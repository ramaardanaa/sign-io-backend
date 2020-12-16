const request = require('supertest');
const app = require('../app');

let token;
let contactId;

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
      return request(app).post('/users/register').send({
        name: 'lalalaq',
        email: 'admin3@mail.com',
        password: '1234'
      })
    })
    .then(res => {
      const { body } = res;
      contactId = body.id
      return request(app).post('/friends').set({
        access_token: token
      }).send({
        contact: contactId
      })
    })
    .then(data => {
      done()
    })
    .catch(err => done())
})

describe('Test Endpoint /friends', () => {
  describe('Test endpoint GET', () => {
    it('Test get friends success', (done) => {
      request(app)
        .get('/friends')
        .set({ access_token : token })
        .then(response => {
          const { status } = response
          expect(status).toBe(200)
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

    it('Test get friends fail scenario', (done) => {
      request(app)
        .get('/friends')
        .set({ access_token : token })
        .send({
          bug: 'bug'
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(500)
          expect(body).toHaveProperty('msg', 'Internal server error')
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
          contact: contactId
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('contact', expect.any(Number))
          done()
        })
        .catch(err => console.log(err))
    })

    it('Test create friends no access token', (done) => {
      request(app)
        .post('/friends')
        .send({
          contact: contactId
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'Authentication Failed')
          done()
        })
        .catch(err => console.log(err))
    })

    it('Test create friends failed scenario', (done) => {
      request(app)
        .post('/friends')
        .set({
          access_token: token
        })
        .send({
          contact: contactId,
          bug: 'bug'
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(500)
          expect(body).toHaveProperty('msg', 'Internal server error')
          done()
        })
        .catch(err => console.log(err))
    })

    // it('Test create friends friend is required', (done) => {
    //   request(app)
    //     .post('/friends')
    //     .set({
    //       access_token: token
    //     })
    //     .send({
    //       owner: '1',
    //       contact: ''
    //     })
    //     .then(response => {
    //       const { body, status } = response
    //       expect(status).toBe(400)
    //       expect(body).toHaveProperty('msg', 'friend is required')
    //       done()
    //     })
    //     .catch(err => console.log(err))
    // })
  })

  beforeAll((done) => {
    request(app)
      .post('/friends')
      .set({
        access_token: token
      })
      .send({
        contact: contactId
      })
      .then(data => {
        done()
      })
      .catch(err => done())
  })

  describe('Test endpost DELETE', () => {
    it('Test delete friend success', (done) => {
      console.log(contactId, 'CONTACT 1')
      request(app)
        .delete(`/friends/${contactId}`)
        .set({
          access_token: token
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('msg', 'user has been removed')
          done()
        })
        .catch(err => done())
    })

    it('Test delete friend no access token', (done) => {
      console.log(contactId, 'CONTACT 1')
      request(app)
        .delete(`/friends/${contactId}`)
        .then(response => {
          const { body, status } = response
          console.log(body, status)
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'Authentication Failed')
          done()
        })
        .catch(err => done())
    })

    it('Test delete friend failed scenario', (done) => {
      console.log(contactId, 'CONTACT 1')
      request(app)
        .delete(`/friends/${contactId}`)
        .set({
          access_token: token
        })
        .send({
          bug: 'bug'
        })
        .then(response => {
          const { body, status } = response
          expect(status).toBe(500)
          expect(body).toHaveProperty('msg', 'Internal server error')
          done()
        })
        .catch(err => done())
    })
  })
})