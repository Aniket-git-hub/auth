import express from 'express';
import addCourseController from "../controllers/course/addCourseController.js";
import deleteCourseController from "../controllers/course/deleteCourseController.js";
import getAllCourseController from "../controllers/course/getAllCourseController.js";
import updateCourseController from "../controllers/course/updateCourseController.js";

const router = express.Router();

router.get("/", getAllCourseController)
router.post("/add", addCourseController)
router.put("/update", updateCourseController)
router.delete("/delete", deleteCourseController)

export default router