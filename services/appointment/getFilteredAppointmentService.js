import { Op } from 'sequelize';
import APPOINTMENT from '../../models/appointmentModel.js';
async function getFilteredAppointmentService(status, fromDate, toDate) {
    try {
        let where = {};
        if (status) {
            where.status = status;
        }
        if (fromDate && toDate) {
            where.consultationDate = {
                [Op.between]: [new Date(fromDate), new Date(toDate)]
            };
        }
        return await APPOINTMENT.findAll({ where });
    } catch (error) {
        console.log(error)
    }
}

export default getFilteredAppointmentService
