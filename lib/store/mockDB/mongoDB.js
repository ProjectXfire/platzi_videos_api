const sinon = require('sinon')
const { moviesMock, filteredMoviesMocks } = require('./movies')

const getAllStub = sinon.stub()
getAllStub.withArgs('movies').resolves(moviesMock)

const tagQuery = { tags: { $in: ['Drama'] } }
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMocks('Drama'))

const createStub = sinon.stub().resolves(moviesMock[0].id)

const getAll = (collection, query) => {
  return getAllStub(collection, query)
}
const create = (collection, data) => {
  return createStub(collection, data)
}

module.exports = {
  getAll,
  create,
  getAllStub,
  createStub
}

