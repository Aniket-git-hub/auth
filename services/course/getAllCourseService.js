import COURSE from '../../models/courseModel.js';

async function getAllCourseService() {
    try {
        const courses = await COURSE.findAll();
        return courses;
    } catch (error) {
        throw error;
    }
}

export default getAllCourseService;
