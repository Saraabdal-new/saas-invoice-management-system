// src/app.js
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root test route
app.get("/", (req, res) => res.send("SMBill backend running ✅"));

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "SMBill backend is healthy ✅",
    timestamp: new Date(),
  });
});

// ------------------------
// Import routes
// ------------------------
const authRoutes = require("./modules/auth/auth.routes");
const usersRoutes = require("./modules/users/users.routes");
const clientsRoutes = require("./modules/clients/clients.routes");
const invoicesRoutes = require("./modules/invoices/invoices.routes");
const itemsRoutes = require("./modules/invoice_items/items.routes"); // fixed folder name
const paymentsRoutes = require("./modules/payments/payments.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const reportsRoutes = require("./modules/reports/reports.routes");
const settingsRoutes = require("./modules/settings/settings.routes");
const notificationsRoutes = require("./modules/notifications/notifications.routes");
const supportTicketsRoutes = require("./modules/support/tickets.routes");

// ------------------------
// Use routes
// ------------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/invoices", invoicesRoutes);
app.use("/api/invoice_items", itemsRoutes); // fixed path consistency
app.use("/api/payments", paymentsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/support", supportTicketsRoutes);


// Export app so server.js can use it

module.exports = app; // <-- export app so server.js can use it
