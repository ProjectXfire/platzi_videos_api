const assert = require('assert')
const buildMessage = require('../utils/buildMessage')

describe('Utils - buildMessage', () => {
  describe('when recieves and entity and action', () => {
    it('should return the respective message', () => {
      const result = buildMessage('movie', 'create')
      const expected = "movie created"
      assert.strictEqual(result, expected)
    })
  })
  describe('when receives and entity and an action and is a list', () => {
    it('shoul return the respective message with the entity in plural', () => {
      const result = buildMessage('movie', 'list')
      const expected = 'movies listed'
      assert.strictEqual(result, expected)
    })
  })
})