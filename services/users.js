const bcrypt = require('bcryptjs')
const {
  getAll,
  create,
} = require('../lib/store/mongoDB/queries')

class UsersService {
  constructor() {
    this.collection = 'users'
  }
  async getUser({ email }) {
    const user = await getAll(this.collection, { email })
    return user || {}
  }
  async createUser({ user }) {
    const { name, email, password } = user
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = await create(this.collection, { name, email, password: hashedPassword })
    return userId
  }

  async getOrCreateUser({ user }) {
    let [querieUser] = await this.getUser({ email: user.email })
    if (querieUser) {
      return querieUser
    }
    await this.createUser({ user })
    querieUser = await this.getUser({ email: user.email })
    return querieUser
  }
}

module.exports = UsersService

