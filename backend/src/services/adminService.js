const pool = require('../config/db');

const findAdminByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    return result.rows[0];
};

const createAdmin = async (username, hashedPassword) => {
    await pool.query('INSERT INTO admins (username, password) VALUES ($1, $2)', [username, hashedPassword]);
};

module.exports = {
    findAdminByUsername,
    createAdmin
};
