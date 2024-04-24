import CATEGORY from '../../models/categoryModel.js';

async function getAllCategoriesService() {
    try {
        const categories = await CATEGORY.findAll();
        return categories;
    } catch (error) {
        throw error;
    }
}

export default getAllCategoriesService; 
