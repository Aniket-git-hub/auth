import express from 'express';
import addCourseController from "../controllers/course/addCourseController.js";
import deleteCourseController from "../controllers/course/deleteCourseController.js";
import getAllCourseController from "../controllers/course/getAllCourseController.js";
import updateCourseController from "../controllers/course/updateCourseController.js";
import { addCourseValidation, deleteCourseValidation, updateCourseValidation } from '../validators/courseValidator.js';

const router = express.Router();

router.get("/", getAllCourseController)
router.post("/add", addCourseValidation, addCourseController)
router.put("/:id", updateCourseValidation, updateCourseController)
router.delete("/:id", deleteCourseValidation, deleteCourseController)

export default router