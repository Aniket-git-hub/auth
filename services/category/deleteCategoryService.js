import CATEGORY from '../../models/categoryModel.js';
import CustomError from '../../utils/createError.js';

async function deleteCategoryService(categoryId) {
    try {
        const deletedCount = await CATEGORY.destroy({
            where: { id: categoryId }
        });

        if (deletedCount === 0) {
            throw new CustomError('AddCourse', 'Category Not Found');
        }

        return { message: ' deleted successfully' };
    } catch (error) {
        throw error;
    }
}

export default deleteCategoryService;
