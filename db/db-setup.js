const knex = require('knex');
const knexfile = require('./knexfile');
const { Model } = require('objection');

function setupDb() {
  // const db = knex(knexfile.development);
  const db = knex(knexfile.awsRDS);
  console.log('execute db setup awsRDS', typeof nexfile.awsRDS)
  console.log('execute db setup awsRDS connection', typeof nexfile.awsRDS.connection)
  console.log('execute db setup awsRDS connection pass', typeof nexfile.awsRDS.connection.password)


  Model.knex(db);
}

module.exports = setupDb;