import COURSE_ENROLLMENT from "../../models/courseEnrollmentModel.js";
import COURSE from "../../models/courseModel.js";
import USER from "../../models/userModel.js";

async function getEnrollmentsByUserIdService(userId) {
    try {
        const user = await USER.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const enrollments = await COURSE_ENROLLMENT.findAll({
            where: { UserId: userId },
            include: [{ model: COURSE }],
        });
        return enrollments
    } catch (error) {
        throw error
    }
}

export default getEnrollmentsByUserIdService;