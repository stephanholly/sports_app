// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'sportsdb',
      host: '127.0.0.1'
    }
  },

  seeds: {
    directory: './seeds'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: 'postgres://cdezepdikwknym:07e0d58c039124d2033018e4e1afa12ebae90b9ce35523a44db520594ddb96b4@ec2-54-225-88-191.compute-1.amazonaws.com:5432/de8t3h56mm1ss6',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
