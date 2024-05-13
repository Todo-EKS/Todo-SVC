// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const {knexSnakeCaseMappers} = require('objection');
require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'koa_todo',
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds',
    },
    ...knexSnakeCaseMappers,
  },
  awsRDS: {
    client: 'pg',
    connection: {
      host: process.env.RDS_POSTGRES_DB_URL,
      user: process.env.RDS_POSTGRES_DB_USERNAME,
      password: process.env.RDS_POSTGRES_DB_PASSWORD,
      database: 'postgres',
      ssl: {
        rejectUnauthorized: false
      },
      port: 5432
    },
  }
};
