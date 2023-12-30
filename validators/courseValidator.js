import { body, param } from 'express-validator';

export const addCourseValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Course name is required')
        .isLength({ max: 255 })
        .withMessage('Course name should not exceed 255 characters')
        .escape(),

    body('fee')
        .isNumeric()
        .withMessage('Invalid course fee')
        .isFloat({ min: 0 })
        .withMessage('Course fee should be a non-negative number'),

    body('startDate').isISO8601().withMessage('Invalid start date').toDate(),

    body('endDate').isISO8601().withMessage('Invalid end date').toDate(),

    body('durationMonths')
        .isNumeric()
        .withMessage('Invalid duration value')
        .isInt({ min: 1 })
        .withMessage('Duration must be a positive integer')
        .toInt(),

    body('lectureSchedule')
        .trim()
        .notEmpty()
        .withMessage('Lecture schedule is required')
        .escape(),

    body(['startDate', 'endDate', 'durationMonths']).custom(
        (value, { req }) => {
            const startDate = new Date(req.body.startDate);
            const endDate = new Date(req.body.endDate);
            const durationMonths = req.body.durationMonths;

            if (startDate > endDate) {
                throw new Error('Start date must be before end date');
            }

            if (durationMonths * 30 > endDate.getTime() - startDate.getTime()) {
                throw new Error(
                    'Duration exceeds the time range between start and end dates'
                );
            }

            return true;
        }
    )
];

export const updateCourseValidation = [
    param('id')
        .isNumeric()
        .withMessage('Invalid course ID')
        .isInt({ min: 1 })
        .withMessage('Course ID must be a positive integer'),

    body('name')
        .optional({ nullable: true })
        .trim()
        .notEmpty()
        .withMessage('Course name is required')
        .isLength({ max: 255 })
        .withMessage('Course name should not exceed 255 characters')
        .escape(),

    body('fee')
        .optional({ nullable: true })
        .isNumeric()
        .withMessage('Invalid course fee')
        .isFloat({ min: 0 })
        .withMessage('Course fee should be a non-negative number'),

    body('startDate')
        .optional({ nullable: true })
        .isISO8601()
        .withMessage('Invalid start date')
        .toDate(),

    body('endDate')
        .optional({ nullable: true })
        .isISO8601()
        .withMessage('Invalid end date')
        .toDate(),

    body('durationMonths')
        .optional({ nullable: true })
        .isNumeric()
        .withMessage('Invalid duration value')
        .isInt({ min: 1 })
        .withMessage('Duration must be a positive integer')
        .toInt(),

    body('lectureSchedule')
        .optional({ nullable: true })
        .trim()
        .notEmpty()
        .withMessage('Lecture schedule is required')
        .escape(),

    body(['startDate', 'endDate', 'durationMonths', 'lectureSchedule']).custom(
        (value, { req }) => {
            if (req.body.startDate && req.body.endDate) {
                const startDate = new Date(req.body.startDate);
                const endDate = new Date(req.body.endDate);
                const durationMonths = req.body.durationMonths
                    ? req.body.durationMonths
                    : null;

                if (startDate > endDate) {
                    throw new Error('Start date must be before end date');
                }

                if (
                    durationMonths &&
                    durationMonths * 30 >
                        endDate.getTime() - startDate.getTime()
                ) {
                    throw new Error(
                        'Duration exceeds the time range between start and end dates'
                    );
                }
            }

            return true;
        }
    )
];

export const deleteCourseValidation = [
    param('id')
        .isNumeric()
        .withMessage('Invalid course ID')
        .isInt({ min: 1 })
        .withMessage('Course ID must be a positive integer')
];
