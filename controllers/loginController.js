import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import loginService from '../services/auth/loginService.js';
const { userSchema } = require('../validationSchemas');

async function loginController(req, res) {
    // Validate input using express-validator
    await validationResult(req).throw();

    // Validate input against schema using Joi
    const { error } = Joi.validate(req.body, userSchema);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { email, password } = req.body;
        const user = await loginService(email, password);

        // Sign the token in the controller
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(401).json({ error: 'Invalid credentials' });
    }
}

export default loginController;