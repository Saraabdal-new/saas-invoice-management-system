require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,       // this will be used to sign JWT
  jwtExpiresIn: "1d"                       // token valid for 1 day
};