import COURSE_ENROLLMENT from '../../models/courseEnrollmentModel.js';

async function getPendingEnrollmentsService(req, res, next) {
    try {
        const pendingEnrollments = await COURSE_ENROLLMENT.findAll({
            where: { status: 'pending' }
        });

        return pendingEnrollments;
    } catch (error) {
        throw error;
    }
}

export default getPendingEnrollmentsService;
