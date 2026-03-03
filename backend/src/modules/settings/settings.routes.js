const express = require("express");
const router = express.Router();
const SettingsController = require("./settings.controller");
const { verifyToken } = require("../../middlewares/auth.middleware");
router.use(verifyToken);

// Settings routes
router.get("/", SettingsController.getSettings);                // Get all settings for current user
router.put("/company", SettingsController.updateCompanyInfo);   // Update company info
router.put("/invoice", SettingsController.updateInvoiceSettings);// Update invoice defaults
router.put("/tax", SettingsController.updateTaxSettings);       // Update tax configuration
router.put("/notifications", SettingsController.updateEmailNotifications); // Email notifications
router.put("/appearance", SettingsController.updateAppearance);  // Theme / color settings

module.exports = router;
