import CATEGORY from '../../models/categoryModel.js';

async function getCategoryByIdService(categoryId) {
    try {
        const categories = await CATEGORY.findByPk(categoryId);
        return categories;
    } catch (error) {
        throw error;
    }
}

export default getCategoryByIdService;
