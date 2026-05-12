const { Pool } = require('pg');

const localPool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "Abhi@123",
    port: 5432,
    database: "assuresiftrelocation"
});

const tables = ['admins', 'users', 'status', 'blogs', 'contact_us', 'order_ids'];

async function checkData() {
    try {
        console.log("Checking local data...");
        for (const table of tables) {
            const res = await localPool.query(`SELECT COUNT(*) FROM ${table}`);
            console.log(`Table ${table}: ${res.rows[0].count} rows`);
        }
    } catch (err) {
        console.error("Error checking local data:", err.message);
    } finally {
        await localPool.end();
    }
}

checkData();
