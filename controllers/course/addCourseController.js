import { validationResult } from 'express-validator';
import addCourseService from '../../services/course/addCourseService.js';
import CustomError from '../../utils/createError.js';

async function addCourseController(req, res, next) {
    try {
        validationResult(req).throw();
        const courseDetails = req.body;
        const addedCourse = await addCourseService(courseDetails);

        res.status(201).json({
            message: 'Course added successfully',
            course: addedCourse
        });
    } catch (error) {
        if (error.errors && error.errors.length > 0) {
            let err = new CustomError('Validation');
            err.errors = error.errors.map((e) => e.msg);
            next(err);
        }
        next(error);
    }
}

export default addCourseController;
