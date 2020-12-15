const request = require('supertest');
const app = require('../app');

let token;
let MemberId;
let RoomsId;

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
      return request(app)
      .post('/rooms')
      .set({
        access_token: token
      })
      .send({
        name: "private rooms"
      })
    })
    .then(response => {
      const { body } = response;
      RoomsId = body.id;
      done()
    })
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

        console.log(body, '<<<<< ini body');
        console.log(status, '<<<< ini status');
        done()
      })
  })

  // Get member failed
  it('test get members Failed', (done) => {
    request(app)
      .get('/members')
      .then(res => {
        const { body, status } = res;

        console.log(body, '<<<<< ini body');
        console.log(status, '<<<< ini status');
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
        UserId: "1",
        RoomId: RoomsId
      })
      .then(res => {
        const { body, status } = res;
        console.log(body, "body <<<<<<")

        MemberId = body.id;
        console.log(MemberId, "<<<< member Id")

        expect(status).toEqual(201);
        expect(body).toHaveProperty("UserId", "1")
        expect(body).toHaveProperty("RoomId", "1")
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
        UserId: "1",
        RoomId: "1"
      })
      .then(res => {
        const { body, status } = res;

        expect(status).toEqual(500);
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
      .send({
        UserId: "1",
        RoomId: "1"
      })
      .then(response => {
      const { body, status } = response;
      
      expect(status).toEqual(200);
      expect(body).toHaveProperty('msg', 'Delete Success');
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
      .send({
        UserId: "1",
        RoomId: "1"
      })
      .then(response => {
      const { body, status } = response;
      
      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Authentication Failed');
      done();
      })
  })
})