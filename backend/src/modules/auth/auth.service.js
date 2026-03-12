const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");
const { jwtSecret, jwtExpiresIn } = require('../../config/jwt');

// ---------------- Register ----------------
exports.register = async (data) => {
    const { name, email, password } = data;
    if (!name || !email || !password) throw new Error("All fields are required");

    // Check if email exists
    const existing = await db.query(
        "SELECT id FROM users WHERE email=$1",
        [email]
    );
    if (existing.rows.length > 0) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const result = await db.query(
        `INSERT INTO users (id, name, email, password)
         VALUES ($1,$2,$3,$4)
         RETURNING id, name, email, role`,
        [userId, name, email, hashedPassword]
    );

    return {
        status: "OK",
        data: result.rows[0]
    };
};

// ---------------- Login ----------------
exports.login = async ({ email, password }) => {
    const result = await db.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );

    const user = result.rows[0];
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    // Generate JWT
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        jwtSecret,
        { expiresIn: jwtExpiresIn }
    );

    return {
        status: "OK",
        token
    };
};

// ---------------- Placeholder functions ----------------
exports.refreshToken = async (refreshToken) => {
    throw new Error("Not implemented yet");
};

exports.forgotPassword = async (email) => {
    throw new Error("Not implemented yet");
};

exports.resetPassword = async (token, password) => {
    throw new Error("Not implemented yet");
};