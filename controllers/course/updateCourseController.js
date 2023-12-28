import updateCourseAppointment from "../../services/course/updateCourseService.js";
async function updateCourseController(req, res, next) {
    try {
        const courseId = req.params.id;
        const courseDetails = req.body;

        const updatedCourse = await updateCourseAppointment(courseId, courseDetails);

        res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
        next(error)
    }
}

export default updateCourseController;