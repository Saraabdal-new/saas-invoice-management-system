// src/server.js
require("dotenv").config(); // <-- must be first
const { connectDB } = require("./config/db");
const app = require("./app"); // <-- import app from app.js

// Connect to PostgreSQL
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SMBill backend running on port ${PORT}`);
});
