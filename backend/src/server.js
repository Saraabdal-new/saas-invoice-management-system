// src/server.js
require("dotenv").config(); // must be first

require("./config/db"); // initialize PostgreSQL pool

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SMBill backend running on port ${PORT}`);
});