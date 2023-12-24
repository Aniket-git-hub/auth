import express from 'express';
import bookAppointmentController from "../controllers/appointment/bookAppointment.js";
import updateAppointmentController from "../controllers/appointment/updateAppointment.js";

const router = express.Router();

router.post("/", bookAppointmentController)
router.put("/update", updateAppointmentController)

export default router