// Update with your config settings.
const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
  // needed when using foreign keys
  // this enables foreign keys in SQLite
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done) // turn on FK enforcement
    },
  },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: './data/recipes.db3' },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './data/recipes.test.db3' },
  },
  production: {}
}

