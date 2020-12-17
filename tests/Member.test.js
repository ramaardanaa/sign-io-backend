const request = require('supertest');
const app = require('../app');

let token;
let MemberId;
let UserId;
let RoomId;
let code;

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
      UserId = body.id;
      return request(app).post('/rooms').set({
        access_token: token
      }).send({
        name: "rooms private"
      })
    })
    .then(res => {
      RoomId = res.body.id;
      code = res.body.code;
      done()
    })
    .catch(console.log)
})

describe('Test Endpoint GET /members', () => {

  // Get members Success
  it('test get members Success', (done) => {
    request(app)
      .get('/members')
      .set({
        access_token: token
      })
      .then(res => {
        const { body, status } = res;
        expect(status).toEqual(200);
        done()
      })
  })

  it('test get members Success', (done) => {
    request(app)
      .get('/members')
      .set({
        access_token: token
      })
      .send({
        bug: 'test'
      })
      .then(res => {
        const { body, status } = res;
        expect(status).toEqual(400);
        done()
      })
  })

  // Get member failed
  it('test get members Failed no token', (done) => {
    request(app)
      .get('/members')
      .then(res => {
        const { body, status } = res;

        expect(status).toEqual(401);
        expect(body).toHaveProperty('msg', 'Authentication Failed');
        done()
      })
  })
})

describe('Test Endpoint POST /members', () => {
  //Post Members Success
  it('test post members Success', (done) => {
    request(app)
      .post('/members')
      .set({
        access_token: token
      })
      .send({
        code: code
      })
      .then(res => {
        const { body, status } = res;
        MemberId = body.id;

        expect(status).toEqual(201);
        expect(body).toHaveProperty("UserId", expect.any(Number))
        expect(body).toHaveProperty("RoomId", expect.any(Number))
        done()
      })
  })

  it('test post members failed input null', (done) => {
    request(app)
      .post('/members')
      .set({
        access_token: token
      })
      .send({
        UserId: '',
        RoomId: ''
      })
      .then(res => {
        const { body, status } = res;

        expect(status).toEqual(500);
        expect(body).toHaveProperty("msg", "internal server error")
        done()
      })
  })

  //Post Member Failed
  it('test post members Failed', (done) => {
    request(app)
      .post('/members')
      .set({
        access_token: ''
      })
      .send({
        UserId: UserId,
        RoomId: RoomId
      })
      .then(res => {
        const { body, status } = res;

        expect(status).toEqual(401);
        expect(body).toHaveProperty('msg', 'Authentication Failed');
        done()
      })
  })
})

describe('Test Endpoint DELETE /members/:id', () => {
  
  // Test delete members Sukses
  it('test delete member success', (done) => {
    request(app)
      .delete(`/members/${MemberId}`)
      .set({
        access_token: token
      })
      .then(response => {
      const { body, status } = response;
      
      expect(status).toEqual(200);
      expect(body).toHaveProperty('msg', 'Delete Success');
      done();
      })
  })

  it('test delete member data failed', (done) => {
    request(app)
      .delete(`/members/X`)
      .set({
        access_token: token
      })
      .then(response => {
      const { body, status } = response;
      
      expect(status).toEqual(500);
      expect(body).toHaveProperty('msg', 'internal server error');
      done();
      })
  })

  // Test delete members Failed
  it('test delete member Failed', (done) => {
    request(app)
      .delete(`/members/${MemberId}`)
      .set({
        access_token: ""
      })
      .then(response => {
      const { body, status } = response;
      
      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Authentication Failed');
      done();
      })
  })
})