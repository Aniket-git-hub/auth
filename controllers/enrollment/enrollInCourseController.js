import { validationResult } from 'express-validator';
import createCourseEnrollmentService from '../../services/enrollment/createCourseEnrollmentService.js';
import CustomError from "../../utils/createError.js";

async function enrollInCourseController(req, res, next) {
    try {

        validationResult(req).throw();

        const { courseId, paymentTransactionId, paymentScreenshotUrl } = req.body;
        const userId = req.user.userId;

        const enrollment = await createCourseEnrollmentService(
            courseId,
            userId,
            paymentTransactionId,
            paymentScreenshotUrl
        );

        res.status(201).json({
            message: 'Enrollment request created successfully',
            enrollment
        });

    } catch (error) {
        if (error.errors && error.errors.length > 0) {
            let err = new CustomError("Validation")
            err.errors = error.errors.map(e => e.msg)
            next(err)
        }
        next(error)
    }
}

export default enrollInCourseController