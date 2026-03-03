const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../../config/jwt');
const { sequelize } = require('../../config/db');

exports.register = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await db.query(
        `INSERT INTO users (id, name, email, password) VALUES ($1,$2,$3,$4) RETURNING *`,
        [data.id, data.name, data.email, hashedPassword]
    );
    return user.rows[0];
};

exports.login = async ({ email, password }) => {
    const result = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
    const user = result.rows[0];
    if (!user) throw new Error('User not found');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid password');
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
    return token;
};

exports.refreshToken = async (refreshToken) => { /* implement JWT refresh logic */ };
exports.forgotPassword = async (email) => { /* send reset link */ };
exports.resetPassword = async (token, password) => { /* reset password */ };
