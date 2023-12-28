import COURSE from "../../models/courseModel.js";

async function deleteCourseService(courseId) {
    try {
        const deletedCount = await COURSE.destroy({
            where: { id: courseId },
        });

        if (deletedCount === 0) {
            throw new Error('Course not found');
        }

        return { message: 'Course deleted successfully' };
    } catch (error) {
        throw error
    }
}

export default deleteCourseService