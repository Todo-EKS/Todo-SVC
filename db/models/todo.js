const { Model } = require('objection');

class Todo extends Model {
  static get tableName() {
    return 'koa_todo'
  }
}

module.exports = Todo