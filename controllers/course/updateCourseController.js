import { validationResult } from "express-validator";
import updateCourseAppointment from "../../services/course/updateCourseService.js";
import CustomError from "../../utils/createError.js";
async function updateCourseController(req, res, next) {
    try {
        validationResult(req).throw();
        const courseId = req.params.id;
        const courseDetails = req.body;

        const updatedCourse = await updateCourseAppointment(courseId, courseDetails);

        res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
        if (error.errors && error.errors.length > 0) {
            let err = new CustomError("Validation")
            err.errors = error.errors.map(e => e.msg)
            next(err)
        }
        console.log(error)
        next(error)
    }
}

export default updateCourseController;