
// test
var assert = require('assert');
var request = require('supertest');
var app = require('../app.js');

describe('GET /', function() {
   it('respond with hello world', function(done) {
       // navigate to root and check the response is "hello world"
       request(app)
           .get('/')
           .expect(200)
           .expect('hello world', done);
   });
});

describe('POST /users/1/', function() {
   it('response json object', function(done) {
      // post
      request(app)
          .post('/users/2/')
          .send({
              name : 'Basil'
          })
          .expect(200, {
              user_id: 2,
              name: 'Basil'
          }, done);

          /*
          .expect(200)
          .end(function(err, res) {
              if (err) throw err;

              if(res.body.user_id == 1) {
                  done();
              } else {
                  //done('error');
                  //throw new Error(`invalid user_id expected 2 received ${res.body.user_id}`);
                  throw new Error('invalid user_id');
                  //done(new Error("missing next key"));
              }

          })
           */

   });
});

describe('Array', function() {
   describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function() {
          assert.equal([1, 2, 3].indexOf(4), -1);
      });
   });
});

describe('User', function() {
   describe('#save()', function() {
      it('should save without error', function(done) {
         var user = new User()
      });
   });
});