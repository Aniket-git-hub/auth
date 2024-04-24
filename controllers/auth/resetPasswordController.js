import bcrypt from 'bcrypt';
import USER from '../../models/userModel.js';

async function resetPasswordController(req, res, next) {
    const { email, password } = req.body;
    try {
        const savedUser = await USER.findOne({ where: { email } })
        if (!savedUser) {
            throw new Error('no user found')
        }
        const { password: savePassword, ...rest } = await resetPassword(savedUser.id, password)
        res.send({
            user: rest,
            message: "Password Updated"
        })
    } catch (error) {
        console.log(error)
    }
}

export default resetPasswordController;

const resetPassword = async (userId, newPassword) => {
    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in the database
        await USER.update({
            password: hashedPassword
        }, {
            where: { id: userId }
        });

        return USER.findByPk(userId)
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error; // Handle or propagate the error as needed
    }
};