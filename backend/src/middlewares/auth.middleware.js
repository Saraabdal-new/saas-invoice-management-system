const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

/**
 * Verify JWT token and attach user to request
 */
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
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