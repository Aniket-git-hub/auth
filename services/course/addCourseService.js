import COURSE from '../../models/courseModel.js';

async function addCourseService(courseDetails) {
    try {
        const course = await COURSE.create(courseDetails);
        return course;
    } catch (error) {
        throw error;
    }
}

export default addCourseService;
