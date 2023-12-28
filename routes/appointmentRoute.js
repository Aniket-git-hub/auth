import express from 'express';
import bookAppointmentController from "../controllers/appointment/bookAppointment.js";
import getAppointmentsController from "../controllers/appointment/getAppointments.js";
import updateAppointmentController from "../controllers/appointment/updateAppointment.js";
import { bookAppointmentValidation, getAppointmentsValidation, updateBookingStatusValidation } from '../validators/appointmentValidator.js';

const router = express.Router();

router.post("/", bookAppointmentValidation, bookAppointmentController)
router.get("/export-csv", getAppointmentsValidation, getAppointmentsController)
router.put("/update", updateBookingStatusValidation, updateAppointmentController)

export default router