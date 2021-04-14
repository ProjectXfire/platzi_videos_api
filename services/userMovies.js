const {
  getAll,
  create,
  remove
} = require('../lib/store/mongoDB/queries')

class UserMoviesService {
  constructor() {
    this.collection = 'user-movies'
  }

  async getUserMovies({ userId }) {
    const query = userId && { userId }
    const userMovies = await getAll(this.collection, query)
    return userMovies || []
  }
  async createUserMovies({ userMovie }) {
    const userMovieId = await create(this.collection, userMovie)
    return userMovieId
  }
  async deleteUserMovies({ id }) {
    const userMovieId  = await remove(this.collection, id)
    return userMovieId
  }
}

module.exports = UserMoviesService