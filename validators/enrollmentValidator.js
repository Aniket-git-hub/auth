import { body, check } from 'express-validator';

export const createEnrollmentValidator = [
    body('courseId')
        .notEmpty()
        .isInt(),
    body('paymentScreenshotUrl')
        .notEmpty()
        .isString(),
    body('paymentTransactionId')
        .notEmpty()
        .isString(),
    check('courseId').toInt(),
    check('paymentScreenshotUrl').escape(),
    check('paymentTransactionId').escape(),
];

export const updateEnrollmentValidator = [
    body('status')
        .notEmpty()
        .isIn(['pending', 'approved', 'rejected']),
    check('status').escape(),
];
