import { validationResult } from 'express-validator';
import updateCategoryService from '../../services/category/updateCategoryService.js';
import CustomError from '../../utils/createError.js';

async function updateCategoryController(req, res, next) {
    const { categoryName } = req.body;
    try {
        validationResult(req).throw();

        const updatedCategory = await updateCategoryService(categoryName);

        res.status(201).json({
            message: 'Course added successfully',
            updatedCategory,
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

export default updateCategoryController;
