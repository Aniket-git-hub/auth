import { validationResult } from 'express-validator';
import getAllCategoriesService from '../../services/category/getCategoriesService.js';
import CustomError from '../../utils/createError.js';

async function getCategoriesController(req, res, next) {
    try {

        validationResult(req).throw();

        const categories = await getAllCategoriesService();

        res.status(201).json({
            categories
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

export default getCategoriesController;
