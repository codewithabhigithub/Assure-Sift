const pool = require('../config/db');

const saveContactForm = async (contactData) => {
    const { name, email, message, purpose } = contactData;
    const query = `
        INSERT INTO contact_us (name, email, message, purpose)
        VALUES ($1, $2, $3, $4)
        RETURNING id
    `;
    const values = [name, email, message, purpose];
    const result = await pool.query(query, values);
    return result.rows[0].id;
};

module.exports = {
    saveContactForm
};
