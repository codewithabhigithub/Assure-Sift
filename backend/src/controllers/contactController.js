const contactService = require('../services/contactService');
const sendEmail = require('../../email');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const submitContactForm = async (req, res, next) => {
    try {
        const { name, email, message, purpose } = req.body;

        if (!name || !email || !message || !purpose) {
            return errorResponse(res, 'All fields are required', 400);
        }

        const id = await contactService.saveContactForm({ name, email, message, purpose });

        const emailContent = `Name: ${name}\nEmail: ${email}\nPurpose: ${purpose}\nMessage: ${message}`;

        await Promise.all([
            sendEmail(email, 'Contact Form Submission Received', 'Thank you for reaching out! We will get back to you soon.'),
            sendEmail(process.env.COMPANY_EMAIL, 'New Contact Form Submission', emailContent)
        ]);

        return successResponse(res, { id }, 'Form submitted successfully and emails sent');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitContactForm
};
