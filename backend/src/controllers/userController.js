const userService = require('../services/userService');
const sendEmail = require('../../email'); // Keep existing email for now
const { successResponse, errorResponse } = require('../utils/responseHandler');

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        return successResponse(res, users);
    } catch (error) {
        next(error);
    }
};

const getCompleteInfo = async (req, res, next) => {
    try {
        const { order_id } = req.body;
        const info = await userService.getUserByOrderId(order_id);
        if (info.length === 0) {
            return errorResponse(res, 'Users not found', 404);
        }
        return successResponse(res, info);
    } catch (error) {
        next(error);
    }
};

const updateStatus = async (req, res, next) => {
    try {
        const { order_id, status } = req.body;
        const result = await userService.updateStatus(order_id, status);

        if (!result) {
            return errorResponse(res, 'User not found', 404);
        }

        const subject = 'Order Status Update';
        const text = `Your order (${order_id}) status has been updated to: ${status}`;
        await sendEmail(result.email, subject, text);

        return successResponse(res, null, 'Order status updated and notification sent');
    } catch (error) {
        next(error);
    }
};

const createEnquiry = async (req, res, next) => {
    console.log("userinfo ------------", req.body);
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return errorResponse(res, 'Name, Email, and Phone are required', 400);
        }

        const order_id = await userService.generateOrderId('SSENQ');
        const userData = { ...req.body, order_id };

        // Normalize fields
        for (let key in userData) {
            if (userData[key] === '') userData[key] = null;
        }

        await userService.createUserEnquiry(userData);

        // Prepare email content (mimicking existing logic)
        const generateOrderDetails = (details) => {
            let str = '';
            for (const [key, value] of Object.entries(details)) {
                if (value) str += `${key}: ${value}\n`;
            }
            return str;
        };

        const emailContent = generateOrderDetails({
            'Enquiry No': order_id,
            'Name': userData.name,
            'Email': userData.email,
            'Phone': userData.phone,
            'Pickup Date': userData.pickup_date,
            'Pickup Time': userData.pickup_time,
            'Pickup Address': userData.pickup_address,
            'Drop Address': userData.drop_address,
            'Purpose': userData.purpose,
            'Apartment Size': userData.apartmentSize,
            'Company Name': userData.companyName,
            'Car Model': userData.carModel,
            'Storage Type': userData.storageType,
            'Material Type': userData.materialType,
            'Vehicle Type': userData.vehicleType,
            'Bike Model': userData.bikeModel,
            'Parcel Weight': userData.parcel_weight,
            'Truck Type': userData.truckType,
            'Last Mile Material Type': userData.last_mile_material_type,
            'Measurement': userData.measurement,
            'Shipment Value': userData.shipment_value,
            'Content': userData.content,
        });

        // Send emails asynchronously (mimicking existing logic)
        Promise.all([
            sendEmail(userData.email, 'Your Pickup Request Received', `Thank you for your request. Here are your details:\n${emailContent}`),
            sendEmail(process.env.COMPANY_EMAIL, 'New Pickup Request', emailContent)
        ]).catch(err => console.error('Email error:', err));

        return successResponse(res, { order_id }, 'User details added successfully and emails sent', 201);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getCompleteInfo,
    updateStatus,
    createEnquiry
};
