import { body } from 'express-validator';

export const bookAppointmentValidation = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ max: 50 }).withMessage('Full name should not exceed 50 characters')
        .escape(),

    body('mobileNumber')
        .trim()
        .custom((value) => {
            const regex = /^[6-9]\d{9}$/;
            if (!regex.test(value)) {
                throw new Error('Invalid Indian mobile number');
            }
            return true;
        })
        .escape(),

    body('email')
        .trim()
        .isEmail().withMessage('Invalid email address')
        .escape(),

    //YYYY-MM-DDTHH:mm:ss.sssZ
    body('consultationDate')
        .isISO8601().withMessage('Invalid appointment date')
        .custom((value) => {
            // Additional date checks if needed
            const currentDate = new Date();
            if (new Date(value) < currentDate) {
                throw new Error('Appointment date must be in the future');
            }
            return true;
        })
        .toDate(),

    body('*').trim().escape(),
];


export const updateBookingStatusValidation = [
    body('appointmentId')
        .isNumeric().withMessage('Invalid appointment ID')
        .isInt({ min: 1 }).withMessage('Appointment ID must be a positive integer'),
];