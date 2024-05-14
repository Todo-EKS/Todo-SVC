const knex = require('knex');
const knexfile = require('./knexfile');
const { Model } = require('objection');

function setupDb() {
  // const db = knex(knexfile.development);
  const db = knex(knexfile.awsRDS);

  Model.knex(db);
}

module.exports = setupDb;