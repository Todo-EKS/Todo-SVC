// const { Model } = require('objection');
// const { Model } = require('objection');

// export class Todo extends Model {
//   static tableName = 'todos';
// }

const { Model } = require('objection');

class Todo extends Model {
  static get tableName() {
    return 'todos';
  }
}

module.exports = Todo;
