import jwt from 'jsonwebtoken';
import loginService from '../services/auth/loginService.js';
import getEnvVariable from '../utils/env.js';

async function loginController(req, res, next) {

    try {
        const { email, password } = req.body;
        const { password: storedPassword, ...user } = await loginService(email, password);
        const token = jwt.sign({ userId: user.id }, getEnvVariable("JWT_SECRET"), { expiresIn: '1h' });
        res.status(200).json({ user, token, message: "login successful" });
    } catch (error) {
        next(error);
    }
}

export default loginController;