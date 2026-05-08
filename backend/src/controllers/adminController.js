const adminService = require('../services/adminService');
const { hashPassword, comparePassword } = require('../../auth'); // Keep existing auth for now
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const register = async (req, res, next) => {
    console.log("register", req.body);
    try {
        const { username, password } = req.body;
        const hashedPassword = await hashPassword(password);
        await adminService.createAdmin(username, hashedPassword);
        return successResponse(res, null, 'Admin registered successfully', 201);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const admin = await adminService.findAdminByUsername(username);

        if (!admin) {
            return errorResponse(res, 'Username or password is incorrect', 400);
        }

        const validPassword = await comparePassword(password, admin.password);
        if (!validPassword) {
            return errorResponse(res, 'Invalid password', 400);
        }

        const token = jwt.sign({ id: admin.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        return successResponse(res, { token }, 'Login successful');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};
