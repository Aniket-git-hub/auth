import express from 'express';
import loginController from '../controllers/auth/loginController.js';
import registerController from '../controllers/auth/registerController.js';
import {
    loginValidation,
    registerValidation
} from '../validators/authValidators.js';

const router = express.Router();

router.post('/login', loginValidation, loginController);
router.post('/register', registerValidation, registerController);

export default router;
