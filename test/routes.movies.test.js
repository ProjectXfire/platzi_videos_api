const assert = require('assert')
const proxyquire = require('proxyquire')
const testServer = require('./testServer')
const { moviesMock, MoviesServiceMock } = require('../lib/store/mockDB/movies')

describe('routes - movies', () => {
  const route = proxyquire('../controllers/routes/movies', {
    '../../services/movies': MoviesServiceMock
  })
  const request = testServer(route)
  describe('GET /movies', () => {
    it('should response with status 200', (done) => {
      request.get('/api/movies').expect(200, done)
    })
    it('should response with movies list', (done) => {
      request.get('/api/movies').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        })
        done()
      })
    })
  })
})
