import express from 'express';
import enrollInCourseController from '../controllers/enrollment/enrollInCourseController.js';
import getEnrollmentsByUserIdController from '../controllers/enrollment/getEnrollmentsByUserIdController.js';
import getPendingEnrollmentsController from '../controllers/enrollment/getPendingEnrollmentsController.js';
import updateEnrollmentStatusController from '../controllers/enrollment/updateEnrollmentStatusController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import {
    createEnrollmentValidator,
    updateEnrollmentValidator
} from '../validators/enrollmentValidator.js';

const router = express.Router();

router.post(
    '/create',
    verifyJWT,
    createEnrollmentValidator,
    enrollInCourseController
);
router.get('/get-pending', getPendingEnrollmentsController);
router.get('/:userId/enrollments', verifyJWT, getEnrollmentsByUserIdController);
router.put('/:id', updateEnrollmentValidator, updateEnrollmentStatusController);

export default router;
