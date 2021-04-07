const { MongoClient } = require('mongodb')
const config = require('../../../config')

const { host, name, user, pass } = config.database.mongoDB

const _user = encodeURIComponent(user)
const _pass = encodeURIComponent(pass)

const URI = `mongodb+srv://${_user}:${_pass}@${host}/${name}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.name = name
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err)
          }
          console.log('Connected succesfully to mongo')
          resolve(this.client.db(this.name))
        })
      })
    }
    return MongoLib.connection
  }
}

module.exports = MongoLib