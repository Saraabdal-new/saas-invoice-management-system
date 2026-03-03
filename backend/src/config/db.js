const { Sequelize } = require("sequelize");
const { DB_URL } = require("./env"); // now DB_URL is loaded

const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected");
  } catch (err) {
    console.error("❌ PostgreSQL connection failed", err);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
