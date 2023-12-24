import completeAppointment from "../../services/appointment/completeAppointmentService.js";

async function updateAppointmentController(req, res, next) {
    try {
        const { appointmentId } = req.body;

        const appointment = await completeAppointment(appointmentId);

        res.status(201).json({ appointment, message: "Appointment Updated" });
    } catch (error) {
        next(error);
    }
}

export default updateAppointmentController;