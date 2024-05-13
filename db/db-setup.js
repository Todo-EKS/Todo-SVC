const knex = require('knex');
const knexfile = require('./knexfile');
const { Model } = require('objection');

function setupDb() {
  // const db = knex(knexfile.development);
  const db = knex(knexfile.awsRDS);
  console.log('execute db setup awsRDS', typeof knexfile.awsRDS)
  console.log('execute db setup awsRDS connection', typeof knexfile.awsRDS.connection)
  console.log('execute db setup awsRDS connection pass', knexfile.awsRDS.connection.password)
  console.log('execute db setup awsRDS connection host', knexfile.awsRDS.connection.host)
  console.log('execute db setup awsRDS connection username', knexfile.awsRDS.connection.username)

  Model.knex(db);
}

module.exports = setupDb;