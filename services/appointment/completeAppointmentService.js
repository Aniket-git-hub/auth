import APPOINTMENT from '../../models/appointmentModel.js';

async function completeAppointment(appointmentId) {
    try {
        const appointment = await APPOINTMENT.findByPk(appointmentId);

        if (!appointment) {
            throw new Error('Appointment not found');
        }

        appointment.status = 'completed';
        await appointment.save();

        return appointment;
    } catch (error) {
        console.error('Error completing appointment:', error);
        throw new Error('Failed to complete appointment');
    }
}

export default completeAppointment
