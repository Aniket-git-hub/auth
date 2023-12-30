import COURSE_ENROLLMENT from "../../models/courseEnrollmentModel.js";
import CustomError from "../../utils/createError.js";

async function createCourseEnrollmentService(courseId, userId, paymentTransactionId, paymentScreenshotUrl) {
    try {
        // Check if there is an existing enrollment for the same user and course
        const existingEnrollment = await COURSE_ENROLLMENT.findOne({
            where: {
                CourseId: courseId,
                UserId: userId,
            },
        });

        if (existingEnrollment) {
            throw new CustomError("EnrollmentError", 'User is already enrolled in this course.');
        }

        // If no existing enrollment, create a new one
        const enrollment = await COURSE_ENROLLMENT.create({
            paymentTransactionId,
            paymentScreenshotUrl,
            CourseId: courseId,
            UserId: userId,
        });

        return enrollment;
    } catch (error) {
        throw error;
    }
}

export default createCourseEnrollmentService