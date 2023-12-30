import { body, check } from 'express-validator';

export const createEnrollmentValidator = [
    body('courseId').notEmpty().withMessage('Course Id is required').isInt(),
    body('paymentScreenshotUrl')
        .notEmpty()
        .withMessage('Payment screenshot URL is required')
        .isString(),
    body('paymentTransactionId')
        .notEmpty()
        .withMessage('Payment transaction Id is required')
        .isString(),
    check('courseId').toInt(),
    check('paymentScreenshotUrl').escape(),
    check('paymentTransactionId').escape()
];

export const updateEnrollmentValidator = [
    body('status')
        .notEmpty()
        .withMessage('Enrollment Status is required')
        .isIn(['pending', 'approved', 'rejected']),
    check('status').escape()
];
