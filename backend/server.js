require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createTablesIfNotExists, createDatabaseIfNotExists } = require('./createTable');
const errorHandler = require('./src/middlewares/errorHandler');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
const allowedOrigins = [
    'https://www.assuresiftrelocation.com',
    'https://assuresiftrelocation.com',
    'https://assure-sift.vercel.app', // optional fallback
    'http://localhost:3000',
    'http://localhost:5173'
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create tables on startup
const initDB = async () => {
    try {
        await createDatabaseIfNotExists();
        await createTablesIfNotExists();
        console.log("Database & tables ready");
    } catch (err) {
        console.error("DB Init failed:", err);
        process.exit(1); // stop server if DB fails
    }
};

// Health check
app.get('/', (req, res) => {
    res.send('Welcome to Assure Sift Relocation backend');
});

// Modular Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

initDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});