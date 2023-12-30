import { validationResult } from 'express-validator';
import deleteCourseService from '../../services/course/deleteCourseService.js';
import CustomError from '../../utils/createError.js';

async function deleteCourseController(req, res, next) {
    try {
        validationResult(req).throw();
        const courseId = req.params.id;

        await deleteCourseService(courseId);

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        if (error.errors && error.errors.length > 0) {
            let err = new CustomError('Validation');
            err.errors = error.errors.map((e) => e.msg);
            next(err);
        }
        next(error);
    }
}

export default deleteCourseController;
