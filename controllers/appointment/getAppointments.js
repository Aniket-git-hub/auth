import { validationResult } from "express-validator";
import getFilteredAppointmentService from "../../services/appointment/getFilteredAppointmentService.js";
import CustomError from "../../utils/createError.js";
import generateCsvString from "../../utils/generateCSVFile.js";

async function getAppointments(req, res, next) {
    try {
        validationResult(req).throw();

        const appointments = await getFilteredAppointmentService(req.query.status, req.query.fromDate, req.query.toDate);
        let string = await generateCsvString(appointments);

        res.attachment('appointments.csv').send(string);
    } catch (error) {
        if (error.errors && error.errors.length > 0) {
            let err = new CustomError("Validation")
            err.errors = error.errors.map(e => e.msg)
            next(err)
        }
        next(error)
    }
}

export default getAppointments;