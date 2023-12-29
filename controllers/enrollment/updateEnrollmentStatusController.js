import updateEnrollmentStatusService from '../../services/enrollment/updateEnrollmentStatusService.js';

async function updateEnrollmentStatusController(req, res, next) {
    try {

        const enrollmentId = req.params.id;
        const { status } = req.body;

        await updateEnrollmentStatusService(enrollmentId, status);

        res.status(200).json({
            message: 'Enrollment status updated successfully'
        });

    } catch (error) {
        next(error);
    }
}

export default updateEnrollmentStatusController