require('dotenv').config();

const {
  MONGO_DB_PATH = 'mongodb://localhost:27017/moviedb',
  REQUEST_LOG_FILENAME = 'request.log',
  CORS_ORIGIN_WHITELIST = 'http://localhost:3000',
  NODE_ENV = 'development',
  JWT_SECRET = 'dev-secret',
  ERROR_LOG_FILENAME = 'error.log',
  PORT = 3000,
} = process.env;

module.exports = {
  MONGO_DB_PATH,
  REQUEST_LOG_FILENAME,
  CORS_ORIGIN_WHITELIST,
  NODE_ENV,
  JWT_SECRET,
  ERROR_LOG_FILENAME,
  PORT,
};