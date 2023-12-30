import COURSE_ENROLLMENT from "../../models/courseEnrollmentModel.js";

async function createCourseEnrollmentService(courseId, userId, paymentTransactionId, paymentScreenshotUrl) {
    try {
        // const course = await COURSE.findByPk(courseId);

        // if (!course) {
        //     throw new CustomError("EnrollmentError", 'Course not found. Cannot enroll in a non-existent course.');
        // }

        // const existingEnrollment = await COURSE_ENROLLMENT.findOne({
        //     where: {
        //         courseId,
        //         userId,
        //     },
        // });

        // if (existingEnrollment) {
        //     throw new CustomError("EnrollmentError", 'User is already enrolled in this course.');
        // }

        const enrollment = await COURSE_ENROLLMENT.create({
            paymentTransactionId,
            paymentScreenshotUrl,
            CourseId: courseId,
            UserId: userId
        });

        return enrollment;
    } catch (error) {
        throw error
    }
}

export default createCourseEnrollmentService