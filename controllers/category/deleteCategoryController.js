import { validationResult } from 'express-validator';
import CustomError from '../../utils/createError.js';

async function deleteCategoryController(req, res, next) {
    const categoryId = req.params;
    try {
        validationResult(req).throw();

        await addCourseService(categoryId);

        res.status(201).json({
            message: 'Category Deleted',
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

export default deleteCategoryController;
