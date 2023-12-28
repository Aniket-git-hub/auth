import addCourseService from "../../services/course/addCourseService.js";

async function addCourseController(req, res, next) {
    try {
        const courseDetails = req.body;
        const addedCourse = await addCourseService(courseDetails);

        res.status(201).json({ message: 'Course added successfully', course: addedCourse });
    } catch (error) {
        next(error)
    }
}

export default addCourseController;