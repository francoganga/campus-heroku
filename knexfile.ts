// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config('.env');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DBNAME,
      user: process.env.DBUSER,
      host: process.env.DBHOST,
      port: process.env.DBPORT,
    },
    migrations: {
      directory: 'src/migrations',
    },
    seeds: { directory: 'src/seeds' },
  },

  staging: {
    client: 'pg',
    connection: {
      database: process.env.DBNAME,
      user: process.env.DBUSER,
      host: process.env.DBHOST,
      port: process.env.DBPORT,
    },
    migrations: {
      directory: 'src/migrations',
    },
    seeds: { directory: 'src/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'src/migrations',
    },
    seeds: { directory: 'src/seeds' },
  },
};
