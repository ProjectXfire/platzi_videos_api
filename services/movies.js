const {
  getAll,
  get,
  create,
  update,
  remove
} = require('../lib/store/mongoDB/queries')

class MoviesService {

  constructor() {
    this.collection = 'movies'
  }

  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } }
    const movies = await getAll(this.collection, query)
    return movies || []
  }
  async getMovie({ id }) {
    const movie = await get(this.collection, id)
    return movie || {}
  }
  async createMovie({ movie }) {
    const movieId = await create(this.collection, movie)
    return movieId
  }
  async updateMovie({ id, data }) {
    const movieId = await update(this.collection, id, data)
    return movieId
  }
  async deleteMovie({ id }) {
    const movieId = await remove(this.collection, id)
    return movieId
  }
}

module.exports = MoviesService