import { body } from 'express-validator';

export const addCourseValidation = [
    body('name').trim().notEmpty().withMessage('Course name is required'),
    body('fee').isNumeric().withMessage('Invalid course fee'),
    body('startDate').isISO8601().withMessage('Invalid start date'),
    body('endDate').isISO8601().withMessage('Invalid end date'),
    body('lectureSchedule').trim().notEmpty().withMessage('Lecture schedule is required'),
];

export const updateCourseValidation = [
    param('id').isNumeric().withMessage('Invalid course ID'),
    body('name').trim().notEmpty().withMessage('Course name is required'),
    body('fee').isNumeric().withMessage('Invalid course fee'),
    body('startDate').isISO8601().withMessage('Invalid start date'),
    body('endDate').isISO8601().withMessage('Invalid end date'),
    body('lectureSchedule').trim().notEmpty().withMessage('Lecture schedule is required'),
];