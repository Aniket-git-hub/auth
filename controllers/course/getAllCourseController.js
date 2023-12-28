import getAllCourseService from "../../services/course/getAllCourseService.js";

async function getAllCourseController(req, res, next) {
    try {
        const courses = await getAllCourseService();

        res.status(200).json({ courses });
    } catch (error) {
        next(error)
    }
}

export default getAllCourseController;