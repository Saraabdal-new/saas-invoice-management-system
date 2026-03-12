const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");
const db = require("../config/db");
/**
 * Verify JWT token and attach user to request
 */
exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, jwtSecret);

    // fetch user from DB
    const result = await db.query(
      "SELECT id, name, email, role FROM users WHERE id=$1",
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = result.rows[0]; // attach full user info
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
/**
 * Admin-only access
 */
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

exports.authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access forbidden" });
  }
  next();
};