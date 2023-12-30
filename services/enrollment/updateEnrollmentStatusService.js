import COURSE_ENROLLMENT from "../../models/courseEnrollmentModel.js";
import CustomError from "../../utils/createError.js";

async function updateEnrollmentStatusService(enrollmentId, status) {
    try {
        const [updatedCount] = await COURSE_ENROLLMENT.update(
            { status },
            { where: { id: enrollmentId } }
        );

        if (updatedCount === 0) {
            throw new CustomError("EnrollmentError", 'Enrollment not found');
        }

        return { message: 'Enrollment status updated successfully' };
    } catch (error) {
        throw error;
    }
}

export default updateEnrollmentStatusService;