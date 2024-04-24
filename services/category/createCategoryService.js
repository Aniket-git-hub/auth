import CATEGORY from '../../models/categoryModel.js';

async function createCategoryService(categoryName, type) {
    try {
        const category = await CATEGORY.create({ name: categoryName, type });
        return category;
    } catch (error) {
        throw error;
    }
}

export default createCategoryService;
