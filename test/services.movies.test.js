const assert = require('assert')
const proxyquire = require('proxyquire')
const { getAll, create, getAllStub } = require('../lib/store/mockDB/mongoDB')
const { moviesMock } = require('../lib/store/mockDB/movies')

describe('Services - Movies', () => {
  const MoviesService = proxyquire('../services/movies', {
    '../lib/store/mongoDB/queries': { create, getAll }
  })
  const moviesService = new MoviesService()
  describe('when getMovies is called', async () => {
    it('should call the getAll MongoLib method', async () => {
      await moviesService.getMovies({})
      assert.strictEqual(getAllStub.called, true)
    })
    it('should return and array of movies', async () => {
      const result = await moviesService.getMovies({})
      const expected = moviesMock
      assert.deepStrictEqual(result, expected)
    })
  })
})