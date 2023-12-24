import APPOINTMENT from "../../models/appointmentModel.js";
// import isNonBookableDay from "../utils/isNonBookableDay.js";
// import isOfficeHours from "../utils/isOfficeHours.js";
// import isWorkingDay from "../utils/isWorkingDays.js";

async function bookAppointment(fullName, email, mobileNumber, consultationDate) {
    try {
        // Check if the user has a pending or completed appointment with the same email and mobile number
        const existingAppointment = await APPOINTMENT.findOne({
            where: {
                email,
                mobileNumber,
                status: ['pending'],
            },
        });

        if (existingAppointment) {
            throw new Error('User has a pending or completed appointment. Cannot book a new one.');
        }

        // // Check if the consultation date is a working day and during office hours
        // if (!isWorkingDay(consultationDate) || !isOfficeHours(consultationDate)) {
        //     throw new Error('Invalid consultation date or time');
        // }

        // // Check if the consultation date is a non-bookable day
        // if (isNonBookableDay(consultationDate)) {
        //     throw new Error('Consultation not available on this day');
        // }

        // Create a new appointment
        const appointment = await APPOINTMENT.create({
            fullName,
            email,
            mobileNumber,
            consultationDate,
        });
        return appointment.dataValues;
    } catch (error) {
        console.error('Error booking appointment:', error);
        throw new Error('Failed to book appointment');
    }
}

export default bookAppointment;
