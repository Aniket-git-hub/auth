import express from 'express';
import forgotPasswordController from '../controllers/auth/forgotPasswordController.js';
import loginController from '../controllers/auth/loginController.js';
import registerController from '../controllers/auth/registerController.js';
import resetPasswordController from '../controllers/auth/resetPasswordController.js';
import verifyOtpController from '../controllers/auth/verifyOtpController.js';
import {
    loginValidation,
    registerValidation
} from '../validators/authValidators.js';

const router = express.Router();

router.post('/login', loginValidation, loginController);
router.post('/register', registerValidation, registerController);
router.post('/forgotpassword', forgotPasswordController);
router.post('/verifyotp', verifyOtpController);
router.post('/resetpassword', resetPasswordController);

export default router;
