import express from 'express';

import createCategoryController from "../controllers/category/createCategoryController.js";
import deleteCategoryController from "../controllers/category/deleteCategoryController.js";
import getCategoriesController from "../controllers/category/getCategoriesController.js";
import getCategoryByIdController from "../controllers/category/getCategoryByIdController.js";
import updateCategoryController from "../controllers/category/updateCategoryController.js";

const router = express.Router();

router.get('/', getCategoriesController);
router.get('/:categoryId', getCategoryByIdController);
router.post('/', createCategoryController);
router.put('/:categoryId', updateCategoryController);
router.delete('/:categoryId', deleteCategoryController);

export default router;
