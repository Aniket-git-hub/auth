import { validationResult } from 'express-validator';
import getCategoryByIdService from '../../services/category/getCategoryByIdService.js';
import CustomError from '../../utils/createError.js';

async function getCategoryByIdController(req, res, next) {
    const categoryId = req.params;
    try {
        validationResult(req).throw();

        const category = await getCategoryByIdService(categoryId);

        res.status(201).json({
            category
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

export default getCategoryByIdController;
