const { Pool, Client } = require("pg");

// ====== CONFIG ======
const DB_NAME = "assuresiftrelocation";

const dbConfig = {
    user: "postgres",
    host: "localhost",
    password: "Abhi@123",
    port: 5432,
};

// ====== STEP 1: CREATE DATABASE IF NOT EXISTS ======
const createDatabaseIfNotExists = async () => {
    const client = new Client({
        ...dbConfig,
        database: "postgres", // connect to default DB
    });

    try {
        await client.connect();

        const res = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = $1",
            [DB_NAME]
        );

        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE ${DB_NAME}`);
            console.log(`Database "${DB_NAME}" created`);
        } else {
            console.log(`Database "${DB_NAME}" already exists`);
        }

    } catch (error) {
        console.error("Error creating database:", error);
    } finally {
        await client.end();
    }
};

// ====== STEP 2: CONNECT TO YOUR DATABASE ======
const pool = new Pool({
    ...dbConfig,
    database: DB_NAME,
});

// ====== STEP 3: CREATE TABLES ======
const createTablesIfNotExists = async () => {

    const createAdminsTable = `
        CREATE TABLE IF NOT EXISTS admins (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `;

    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            phone VARCHAR(15) NOT NULL,
            pickup_date DATE NOT NULL,
            pickup_time TIME WITHOUT TIME ZONE NOT NULL,
            pickup_address TEXT NOT NULL,
            drop_address TEXT NOT NULL,
            order_id VARCHAR(20) UNIQUE NOT NULL,
            entry_date DATE DEFAULT CURRENT_DATE NOT NULL,
            purpose TEXT NOT NULL,
            apartment_size VARCHAR(50),         
            company_name VARCHAR(100),          
            car_model VARCHAR(100),             
            storage_type VARCHAR(50),           
            material_type VARCHAR(50),          
            vehicle_type VARCHAR(50),
            bikeModel VARCHAR(255),
            parcel_weight FLOAT,
            truckType VARCHAR(255),
            last_mile_material_type VARCHAR(255),
            measurement VARCHAR(50),
            shipment_value DECIMAL(10, 2),
            content VARCHAR(255)
        );
    `;

    const createStatusTable = `
        CREATE TABLE IF NOT EXISTS status (
            id SERIAL PRIMARY KEY,
            order_id VARCHAR(20) UNIQUE,
            status TEXT NOT NULL
        );
    `;

    const createBlogsTable = `
        CREATE TABLE IF NOT EXISTS blogs (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            image VARCHAR(255),
            author_name VARCHAR(100) NOT NULL,
            tags VARCHAR(255),
            status VARCHAR(20) DEFAULT 'draft',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const createContactUsTable = `
        CREATE TABLE IF NOT EXISTS contact_us (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            purpose VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const createLastOrderIdTable = `
        CREATE TABLE IF NOT EXISTS order_ids (
            last_order_id VARCHAR(20) PRIMARY KEY
        );
    `;

    try {
        await pool.query(createAdminsTable);
        await pool.query(createUsersTable);
        await pool.query(createStatusTable);
        await pool.query(createBlogsTable);
        await pool.query(createContactUsTable);
        await pool.query(createLastOrderIdTable);

        console.log("All tables are ready");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
};


module.exports = {
    pool,
    createTablesIfNotExists,
    createDatabaseIfNotExists
};