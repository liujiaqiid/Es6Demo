/**
 * SuperTest HTTP服务测试库
 * Driven by Super-Agent
 *
 * Refs：
 * 1. https://github.com/visionmedia/supertest
 *    .expect(status[, fn])
 *    .expect(status, body[, fn])
 *    .expect(body[, fn])
 *    .expect(field, value[, fn])
 *    .expect(function(res) {})
 *    .end(fn)
 * 2. https://github.com/visionmedia/superagent
 * 3. http://visionmedia.github.io/superagent
 */

var expect = require('chai').expect;
var app = require('../../app');
var request = require('supertest')(app);

describe('Test SuperTest Libs', function () {
  var uri = '/1/info/cdn';

  describe('Common Methods', function () {

    var checkRes = function (res) {
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('uri')
        .that.is.a('string')
        .that.to.match(/clouddn/);
      expect(res.body).to.have.property('token')
        .that.is.a('string')
        .that.have.length.above(20);
      expect(res.body).to.have.property('smallView')
        .that.is.a('string');
      expect(res.body).to.have.property('middleView')
        .that.is.a('string');
    };

    it('Get cdn info', function (done) {
      request.get(uri)
        .query({ query: 'something', order: 'desc' })
        /* by default: application/x-www-form-urlencode
          same as .type('application/json')*/
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect('Content-Length', 260)
        .expect(200)
        .expect(checkRes)
        .end(function (err, res) {
          if (err && err.status === 503) {
            // it's ok
            return done();
          }
          else if (err) {
            // all other error types we handle generically
            return done(err);
          }
          done();
        });
    });
    it('Post cdn info', function (done) {
      request.post(uri)
        .query({ query: 'something' })
        .query({ order: 'desc' })
        .set('Accept', 'application/json')
        .set('x-juliye-user-id', '53df24da619b8703432d20a6')
        .set('x-juliye-session-token', 'D6883A3C804D9DFE4FAD6DDB7A480257')
        .send({ a: 'm', b: 'n' }) //for test
        .timeout(500)
        .expect('Content-Type', /json/)
        .expect('Content-Length', 260)
        .expect(200)
        .expect(checkRes)
        .end(done);
    });

    it('Put cdn info', function (done) {
      request.put(uri)
        .query('search=something&order=desc')
        .set('Accept', 'application/json')
        .set({
          'x-juliye-user-id': '53df24da619b8703432d20a6',
          'x-juliye-session-token': 'D6883A3C804D9DFE4FAD6DDB7A480257'
        })
        .expect('Content-Type', /json/)
        .expect('Content-Length', 260)
        .expect(200)
        .expect(checkRes)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('Delete cdn info', function (done) {
      request.del(uri)
        .query('search=something')
        .query('order=desc')
        .set('Accept', 'application/json')
        .set('x-juliye-user-id', '53df24da619b8703432d20a6')
        .set('x-juliye-session-token', 'D6883A3C804D9DFE4FAD6DDB7A480257')
        .expect('Content-Type', /json/)
        .expect('Content-Length', 260)
        .expect(200)
        .expect(checkRes)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    // upload files
    //request
    //  .post('/upload')
    //  .field('user[name]', 'Tobi')
    //  .field('user[email]', 'tobi@learnboost.com')
    //  .attach('avatar', 'path/to/tobi.png', 'user.png')
    //  .attach('image', 'path/to/loki.png')
    //  .attach('file', 'path/to/jane.png')
    //  .end(callback);

  });
});
