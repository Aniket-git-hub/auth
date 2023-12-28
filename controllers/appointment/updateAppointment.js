import { validationResult } from "express-validator";
import completeAppointment from "../../services/appointment/completeAppointmentService.js";
import CustomError from "../../utils/createError.js";

async function updateAppointmentController(req, res, next) {
    try {
        validationResult(req).throw();
        const { appointmentId } = req.body;

        const appointment = await completeAppointment(appointmentId);

        res.status(201).json({ appointment, message: "Appointment Updated" });
    } catch (error) {
        if (error.errors && error.errors.length > 0) {
            let err = new CustomError("Validation")
            err.errors = error.errors.map(e => e.msg)
            next(err)
        }
        next(error);
    }
}

export default updateAppointmentController;