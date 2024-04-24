import createCategoryService from '../../services/category/createCategoryService.js';
import CustomError from '../../utils/createError.js';

async function createCategoryController(req, res, next) {
    try {

        // validationResult(req).throw();   
        const { categoryName, type } = req.body;
        const category = await createCategoryService(categoryName, type);

        res.status(201).json({
            message: 'Category Created Successfully',
            category,
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

export default createCategoryController;
