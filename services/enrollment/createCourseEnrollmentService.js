import COURSE_ENROLLMENT from "../../models/courseEnrollmentModel.js";

async function createCourseEnrollmentService(courseId, userId, paymentTransactionId) {
    try {
        const enrollment = await COURSE_ENROLLMENT.create({
            courseId,
            userId,
            paymentTransactionId,
        });

        return enrollment;
    } catch (error) {
        throw error
    }
}

export default createCourseEnrollmentService