import createCourseEnrollmentService from '../../services/enrollment/createCourseEnrollmentService.js';

async function enrollInCourseController(req, res, next) {
    try {

        const { courseId, paymentTransactionId } = req.body;
        const userId = req.user.id;

        const enrollment = await createCourseEnrollmentService(
            courseId,
            userId,
            paymentTransactionId
        );

        res.status(201).json({
            message: 'Enrollment request created successfully',
            enrollment
        });

    } catch (error) {
        next(error);
    }
}

export default enrollInCourseController