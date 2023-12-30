import getEnrollmentsByIdService from "../../services/enrollment/getEnrollmentsByUserIdService.js";

async function getEnrollmentsByIdController(req, res, next) {
    try {
        const userId = req.params.userId;
        const enrollments = await getEnrollmentsByIdService(userId);
        res.status(200).json({
            enrollments
        });
    } catch (error) {
        next(error)
    }
}

export default getEnrollmentsByIdController;