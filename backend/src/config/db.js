const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'assuresiftrelocation',
    password: process.env.DB_PASS || 'Abhi@123',
    port: process.env.DB_PORT || 5432,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
});

module.exports = pool;
