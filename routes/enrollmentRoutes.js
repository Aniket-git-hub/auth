import express from 'express';
import enrollInCourseController from "../controllers/enrollment/enrollInCourseController.js";
import getPendingEnrollmentsController from "../controllers/enrollment/getPendingEnrollmentsController.js";
import updateEnrollmentStatusController from "../controllers/enrollment/updateEnrollmentStatusController.js";
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.post("/create", verifyJWT, enrollInCourseController)
router.get("/get-pending", getPendingEnrollmentsController)
router.post("/update-status", updateEnrollmentStatusController)

export default router