const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.join(__dirname, '../../.env'),
});

const options = {
    abortEarly: true, 
    allowUnknown: true,
    stripUnknown: true
};

const db = {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    ssl: process.env.SSL_ENABLE,
    options: {
      host: process.env.DB_HOST || 'localhost',
      dialect: process.env.DB_DIALECT || 'postgres',
      "define": {
        "timestamps": true
     },
      pool: {
        max: 20,
        min: 0,
        acquire: 60000,
        idle: 10000,
      },
    },
};

module.exports = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    development: db,
    production: db,
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "sqlite"
    }
};