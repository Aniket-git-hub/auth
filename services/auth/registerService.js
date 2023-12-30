import bcrypt from 'bcrypt';
import USER from '../../models/userModel.js';

async function registerUser(
    firstName,
    lastName,
    email,
    password,
    mobileNumber
) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await USER.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            mobileNumber
        });
        return user.dataValues;
    } catch (error) {
        throw error;
    }
}

export default registerUser;
