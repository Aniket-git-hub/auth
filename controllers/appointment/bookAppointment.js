import bookAppointment from "../../services/appointment/bookAppointmentService.js";

async function bookAppointmentController(req, res, next) {
    try {
        const { fullName, email, mobileNumber, consultationDate } = req.body;

        const appointment = await bookAppointment(
            fullName,
            email,
            mobileNumber,
            consultationDate
        );

        res.status(201).json({ appointment, message: "New appointment booked." });
    } catch (error) {
        next(error);
    }
}

export default bookAppointmentController;