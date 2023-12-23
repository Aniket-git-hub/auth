import bcrypt from 'bcrypt';
import USER from "../../models/userModel";

async function registerUser(firstName, lastName, email, password, mobileNumber) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await USER.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            mobileNumber,
        });

        return user;
    } catch (error) {
        console.error('Error during user registration:', error);
        throw new Error('Failed to register user');
    }
}

export default registerUser;
