import bcrypt from 'bcrypt';
import USER from '../../models/userModel.js';
import CustomError from '../../utils/createError.js';

async function loginUser(email, password) {
    try {
        const user = await USER.findOne({ where: { email } });

        if (!user) {
            throw new CustomError('LoginError', 'Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new CustomError('LoginError', 'Invalid credentials');
        }
        return user.dataValues;
    } catch (error) {
        throw error;
    }
}
export default loginUser;
