import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import loginService from '../../services/auth/loginService.js';
import CustomError from '../../utils/createError.js';
import getEnvVariable from '../../utils/env.js';

async function loginController(req, res, next) {
    try {
        validationResult(req).throw();
        const { email, password } = req.body;
        const { password: storedPassword, ...user } = await loginService(
            email,
            password
        );
        const token = jwt.sign(
            { userId: user.id },
            getEnvVariable('JWT_SECRET'),
            { expiresIn: '1h' }
        );
        res.status(200).json({ user, token, message: 'login successful' });
    } catch (error) {
        if (error.errors && error.errors.length > 0) {
            let err = new CustomError('Validation');
            err.errors = error.errors.map((e) => e.msg);
            next(err);
        }
        next(error);
    }
}

export default loginController;
