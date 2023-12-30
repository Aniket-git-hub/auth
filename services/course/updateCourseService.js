import COURSE from '../../models/courseModel.js';
import CustomError from '../../utils/createError.js';

async function updateCourseService(courseId, courseDetails) {
    try {
        const [updatedCount] = await COURSE.update(courseDetails, {
            where: { id: courseId }
        });

        if (updatedCount === 0) {
            throw new CustomError('AddCourse', 'Course not found');
        }

        const updatedCourse = await COURSE.findByPk(courseId);
        return updatedCourse;
    } catch (error) {
        throw error;
    }
}

export default updateCourseService;
