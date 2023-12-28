import deleteCourseService from "../../services/course/deleteCourseService.js";

async function deleteCourseController(req, res, next) {
    try {
        const courseId = req.params.id;

        await deleteCourseService(courseId);

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        next(error)
    }
}

export default deleteCourseController;