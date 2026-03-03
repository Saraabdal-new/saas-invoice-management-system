require("dotenv").config(); // load .env

module.exports = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL
};
