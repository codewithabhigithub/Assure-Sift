const pool = require('../config/db');

const getAllUsers = async () => {
    const result = await pool.query(`
        SELECT us.id, us.entry_date, us.name, us.email, us.phone, us.pickup_date, us.pickup_time, 
               us.pickup_address, us.drop_address, us.order_id, us.purpose, s.status ,us.apartment_size, us.company_name, us.car_model, us.storage_type, us.material_type, us.vehicle_type, us.bikeModel, us.parcel_weight, us.truckType, us.last_mile_material_type, measurement, shipment_value, content
        FROM users AS us 
        FULL OUTER JOIN status AS s ON us.order_id = s.order_id 
        ORDER BY us.id DESC
    `);
    return result.rows;
};

const getUserByOrderId = async (orderId) => {
    const result = await pool.query(`
        SELECT us.name, us.email, us.phone, us.pickup_date, us.pickup_time, us.pickup_address, 
               us.drop_address, us.order_id, us.purpose, s.status, us.apartment_size, us.company_name, us.car_model, us.storage_type, us.material_type, us.vehicle_type, us.bikeModel, us.parcel_weight, us.truckType, us.last_mile_material_type, measurement, shipment_value, content
        FROM users AS us 
        FULL OUTER JOIN status AS s ON us.order_id = s.order_id
        WHERE us.order_id = $1
    `, [orderId]);
    return result.rows;
};

const updateStatus = async (orderId, status) => {
    // Get user email first
    const userResult = await pool.query('SELECT email FROM users WHERE order_id = $1', [orderId]);
    if (userResult.rows.length === 0) return null;

    const email = userResult.rows[0].email;

    await pool.query(
        `INSERT INTO status (order_id, status)
         VALUES ($1, $2)
         ON CONFLICT (order_id)
         DO UPDATE SET status = EXCLUDED.status`,
        [orderId, status]
    );

    return { email };
};

const createUserEnquiry = async (userData) => {
    const {
        order_id, name, email, phone, pickup_date, pickup_time, pickup_address, drop_address, purpose,
        apartmentSize, companyName, carModel, storageType, materialType, vehicleType, bikeModel,
        parcel_weight, truckType, last_mile_material_type, measurement, shipment_value, content
    } = userData;

    await pool.query(
        `INSERT INTO users (
            order_id, name, email, phone, pickup_date, pickup_time, pickup_address, drop_address, purpose, 
            apartment_size, company_name, car_model, storage_type, material_type, vehicle_type,
            bikeModel, parcel_weight, truckType, last_mile_material_type, measurement, shipment_value, content
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`,
        [
            order_id, name, email, phone, pickup_date, pickup_time, pickup_address, drop_address, purpose,
            apartmentSize, companyName, carModel, storageType, materialType, vehicleType, bikeModel,
            parcel_weight, truckType, last_mile_material_type, measurement, shipment_value, content
        ]
    );
};

const generateOrderId = async (prefix = 'SSENQ') => {
    const getFinancialYear = () => {
        const currentDate = new Date();
        let year = currentDate.getFullYear();
        if (currentDate.getMonth() < 3) year -= 1;
        return `${year.toString().slice(-2)}${(year + 1).toString().slice(-2)}`;
    };

    const financialYear = getFinancialYear();
    const result = await pool.query('SELECT last_order_id FROM order_ids ORDER BY last_order_id DESC LIMIT 1');
    let lastOrderId = result.rows.length > 0 ? result.rows[0].last_order_id : `${prefix}${financialYear}000000`;

    const orderNumber = parseInt(lastOrderId.slice(prefix.length + 4)) + 1;
    const newOrderId = `${prefix}${financialYear}${String(orderNumber).padStart(6, '0')}`;

    await pool.query('INSERT INTO order_ids (last_order_id) VALUES ($1) ON CONFLICT (last_order_id) DO NOTHING', [newOrderId]);
    return newOrderId;
};

module.exports = {
    getAllUsers,
    getUserByOrderId,
    updateStatus,
    createUserEnquiry,
    generateOrderId
};
