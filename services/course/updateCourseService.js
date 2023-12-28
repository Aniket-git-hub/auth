import COURSE from "../../models/courseModel.js";

async function updateCourseService(courseId, courseDetails) {
    try {
        const [updatedCount] = await COURSE.update(courseDetails, {
            where: { id: courseId },
        });

        if (updatedCount === 0) {
            throw new Error('Course not found');
        }

        const updatedCourse = await COURSE.findByPk(courseId);
        return updatedCourse;
    } catch (error) {
        throw error
    }
}

export default updateCourseService