import express from 'express';
import loginController from "../controllers/auth/loginController.js";
import registerController from "../controllers/auth/registerController.js";

const router = express.Router();

router.post("/login", loginController)
router.post("/register", registerController)

export default router