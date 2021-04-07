const MongoLib = require('./connection')
const { ObjectId } = require('mongodb')

const db = new MongoLib()

const getAll = async (collection, query) => {
  return db.connect()
    .then(db => db.collection(collection).find(query).toArray())
}

const get = async (collection, id) => {
  return db.connect()
    .then(db => db.collection(collection).findOne({ _id: ObjectId(id)}))
}

const create = async (collection, data) => {
  return db.connect()
    .then(db => db.collection(collection).insertOne(data))
    .then(result => result.insertedId
    )
}

const update = async (collection, id, data) => {
  return db.connect()
    .then(db => db.collection(collection).updateOne(
      { _id: ObjectId(id) },
      { $set: data },
      { upsert: true }
    ))
    .then(result => result.upsertedId || id)
}

const remove = async (collection, id) => {
  return db.connect()
    .then(db => db.collection(collection).deleteOne({ _id: ObjectId(id) }))
    .then(() => id)
}

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
}