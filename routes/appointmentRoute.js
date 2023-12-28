import express from 'express';
import bookAppointmentController from "../controllers/appointment/bookAppointment.js";
import updateAppointmentController from "../controllers/appointment/updateAppointment.js";
import { bookAppointmentValidation, updateBookingStatusValidation } from '../validators/appointmentValidator.js';

const router = express.Router();

router.post("/", bookAppointmentValidation, bookAppointmentController)
router.put("/update", updateBookingStatusValidation, updateAppointmentController)

export default router