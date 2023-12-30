import { body } from 'express-validator';

export const registerValidation = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ max: 25 })
        .withMessage('First name should not be longer than 25 characters'),

    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ max: 25 })
        .withMessage('Last name should not be longer than 25 characters'),

    body('email').trim().isEmail().withMessage('Invalid email address'),

    body('password')
        .trim()
        .isLength({ min: 6, max: 30 })
        .withMessage('Password must be between 6 and 30 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
        )
        .withMessage(
            'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
        ),

    body('mobileNumber')
        .trim()
        .custom((value) => {
            const regex = /^[6-9]\d{9}$/;
            if (!regex.test(value)) {
                throw new Error('Invalid Indian mobile number');
            }
            return true;
        })
];

export const loginValidation = [
    body('email').trim().isEmail().withMessage('Invalid email address'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6, max: 30 })
        .withMessage('Password must be between 6 and 30 characters')
];
