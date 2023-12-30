import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import registerService from '../../services/auth/registerService.js';
import CustomError from '../../utils/createError.js';
import getEnvVariable from '../../utils/env.js';

async function registrationController(req, res, next) {
    try {
        validationResult(req).throw();

        const { firstName, lastName, email, password, mobileNumber } = req.body;

        const { password: storedPassword, ...user } = await registerService(
            firstName,
            lastName,
            email,
            password,
            mobileNumber
        );
        const token = jwt.sign(
            { userId: user.id },
            getEnvVariable('JWT_SECRET'),
            { expiresIn: '1h' }
        );

        res.status(201).json({ user, token, message: 'New user created' });
    } catch (error) {
        if (error.errors && error.errors.length > 0 && error.errors[0].msg) {
            let err = new CustomError('Validation');
            err.errors = error.errors.map((e) => e.msg);
            next(err);
        }
        console.log(error);
        next(error);
    }
}

export default registrationController;
