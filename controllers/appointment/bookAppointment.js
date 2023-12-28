import { validationResult } from "express-validator";
import bookAppointment from "../../services/appointment/bookAppointmentService.js";
import CustomError from "../../utils/createError.js";

async function bookAppointmentController(req, res, next) {
    try {
        validationResult(req).throw()
        const { fullName, email, mobileNumber, consultationDate } = req.body;

        const appointment = await bookAppointment(
            fullName,
            email,
            mobileNumber,
            consultationDate
        );

        res.status(201).json({ appointment, message: "New appointment booked." });
    } catch (error) {
        if (error.errors && error.errors.length > 0) {
            let err = new CustomError("Validation")
            err.errors = error.errors.map(e => e.msg)
            next(err)
        }
        next(error);
    }
}

export default bookAppointmentController;