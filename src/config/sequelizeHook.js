/* eslint-disable */
require('dotenv/config');
let databaseConfig;

if (process.env.NODE_ENV === 'development') {
  databaseConfig = {
    host: process.env.POSTGRES_DATABASE_HOST || '127.0.0.1',
    username: process.env.POSTGRES_DATABASE_USERNAME || 'root',
    password: process.env.POSTGRES_DATABASE_PASSWORD || 'root',
    database: process.env.POSTGRES_DATABASE_NAME || 'block_ops',
    port: Number(process.env.POSTGRES_DATABASE_PORT || '3306'),
    dialect: 'postgres',
    define: {
      timestamps: true,
      freezeTableName: true
    },
    logQueryParameters: true,
    logging: (str) => {
      return process.env.POSTGRES_DATABASE_SHOW_LOGS === 'true' ? console.log(`[DATABASE QUERY ${new Date()}] => ${str}`) : null;
    }
  };
} else {
  databaseConfig = {
    host: process.env.MYSQL_DATABASE_HOST || '127.0.0.1',
    username: process.env.MYSQL_DATABASE_USERNAME || 'root',
    password: process.env.MYSQL_DATABASE_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE_NAME || 'block_ops',
    port: Number(process.env.MYSQL_DATABASE_PORT || '3306'),
    dialect: 'mysql',
    define: {
      timestamps: true,
      freezeTableName: true
    },
    logQueryParameters: true,
    logging: (str) => {
      return process.env.MYSQL_DATABASE_SHOW_LOGS === 'true' ? console.log(`[DATABASE QUERY ${new Date()}] => ${str}`) : null;
    }
  };
}

module.exports = {
  development: {
    ...databaseConfig
  },
  test: {
    ...databaseConfig,
    logging: false
  },
  staging: {
    ...databaseConfig
  },
  production: {
    ...databaseConfig,
    logging: false
  }
};
