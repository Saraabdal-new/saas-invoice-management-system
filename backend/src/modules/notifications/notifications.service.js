const db = require('../../config/db');
const { sequelize } = require('../../config/db');

exports.getNotifications = async (userId) => {
    const result = await db.query(
        `SELECT * FROM notifications WHERE users_id=$1 ORDER BY created_at DESC`,
        [userId]
    );
    return result.rows;
};

exports.markAsRead = async (id) => {
    await db.query(`UPDATE notifications SET is_read=TRUE WHERE id=$1`, [id]);
};
