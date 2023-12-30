import { validationResult } from 'express-validator';
import updateEnrollmentStatusService from '../../services/enrollment/updateEnrollmentStatusService.js';
import CustomError from '../../utils/createError.js';

async function updateEnrollmentStatusController(req, res, next) {
    try {
        validationResult(req).throw();

        const enrollmentId = req.params.id;
        console.log(enrollmentId);
        const { status } = req.body;

        await updateEnrollmentStatusService(enrollmentId, status);

        res.status(200).json({
            message: 'Enrollment status updated successfully'
        });
    } catch (error) {
        if (error.errors && error.errors.length > 0) {
            let err = new CustomError('Validation');
            err.errors = error.errors.map((e) => e.msg);
            next(err);
        }
        next(error);
    }
}

export default updateEnrollmentStatusController;
