import bcrypt from 'bcrypt';
import USER from "../../models/userModel.js";

async function loginUser() {
    try {
        const user = await USER.findOne({ where: { email } });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        return user;
    } catch (error) {
        console.error('Error during user login:', error);
        throw new Error('Failed to log in');
    }

}
export default loginUser;
