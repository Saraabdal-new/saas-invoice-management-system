const { Pool } = require("pg");
const { DB_URL } = require("./env");

const pool = new Pool({
  connectionString: DB_URL
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch(err => {
    console.error("❌ PostgreSQL connection failed", err);
    process.exit(1);
  });

module.exports = pool;