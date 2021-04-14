const { getAll } = require('../lib/store/mongoDB/queries')

class ApiKeysService {
  constructor() {
    this.collection = 'api-keys'
  }

  async getApiKey ({ token }) {
    const apiKey = await getAll(this.collection, { token })
    return apiKey
  }
}

module.exports = ApiKeysService