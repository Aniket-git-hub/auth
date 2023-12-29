import getPendingEnrollmentsService from '../../services/enrollment/getPendingEnrollmentsService.js';

async function getPendingEnrollmentController(req, res, next) {
    try {
        const pendingEnrollments = await getPendingEnrollmentsService();

        res.status(200).json({
            pendingEnrollments
        });

    } catch (error) {
        next(error)
    }
}

export default getPendingEnrollmentController;