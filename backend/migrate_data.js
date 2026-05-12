require('dotenv').config();
const { Pool } = require('pg');

const localConfig = {
    user: "postgres",
    host: "localhost",
    password: "Abhi@123",
    port: 5432,
    database: "assuresiftrelocation"
};

const remoteConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=require') 
        ? { rejectUnauthorized: false } 
        : (process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false)
};

const tables = ['admins', 'users', 'status', 'blogs', 'contact_us', 'order_ids'];

async function migrate() {
    const localPool = new Pool(localConfig);
    const remotePool = new Pool(remoteConfig);

    try {
        console.log("Starting migration...");

        for (const table of tables) {
            console.log(`Migrating table: ${table}...`);
            
            // 1. Fetch from local
            const { rows } = await localPool.query(`SELECT * FROM ${table}`);
            if (rows.length === 0) {
                console.log(`Table ${table} is empty, skipping.`);
                continue;
            }

            // 2. Clear remote table (Optional - but safer for a clean migration)
            // await remotePool.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);

            // 3. Insert into remote
            const columns = Object.keys(rows[0]);
            const columnNames = columns.join(', ');
            
            for (const row of rows) {
                const values = columns.map(col => row[col]);
                const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
                const query = `INSERT INTO ${table} (${columnNames}) VALUES (${placeholders}) ON CONFLICT DO NOTHING`;
                await remotePool.query(query, values);
            }

            console.log(`Migrated ${rows.length} rows to ${table}.`);

            // 4. Sync sequences for SERIAL columns if they exist
            if (columns.includes('id')) {
                const seqRes = await remotePool.query(`SELECT MAX(id) FROM ${table}`);
                const maxId = seqRes.rows[0].max || 0;
                // PostgreSQL specific sequence reset
                try {
                    await remotePool.query(`SELECT setval(pg_get_serial_sequence('${table}', 'id'), ${maxId})`);
                    console.log(`Reset sequence for ${table} to ${maxId}.`);
                } catch (e) {
                    // Sequence might not exist or name might be different, ignore if it fails
                }
            }
        }

        console.log("Migration completed successfully!");
    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await localPool.end();
        await remotePool.end();
    }
}

migrate();
