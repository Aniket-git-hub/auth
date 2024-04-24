import COURSE from '../../models/courseModel.js';
import CustomError from '../../utils/createError.js';

async function updateCategoryService(categoryId, categoryDetails) {
    try {
        const [updatedCount] = await COURSE.update(categoryDetails, {
            where: { id: categoryId }
        });

        if (updatedCount === 0) {
            throw new CustomError('AddCourse', 'Category Not Found');
        }

        const updatedCategory = await COURSE.findByPk(categoryId);
        return updatedCategory;
    } catch (error) {
        throw error;
    }
}

export default updateCategoryService;
