import { body } from 'express-validator';

export const bookAppointmentValidation = [
    body('userId').isNumeric().withMessage('Invalid user ID'),
    body('date').isISO8601().withMessage('Invalid appointment date'),
];

