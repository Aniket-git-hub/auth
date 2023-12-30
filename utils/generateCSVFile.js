import csv from 'fast-csv';

async function generateCSVString(appointments) {
    return new Promise((resolve, reject) => {
        const csvStream = csv.format({ headers: true });
        let csvString = '';

        csvStream.on('data', (data) => {
            csvString += data;
        });

        csvStream.on('end', () => {
            resolve(csvString);
        });

        csvStream.on('error', (error) => {
            reject(error);
        });

        appointments.forEach((appointment) => {
            csvStream.write({
                userId: appointment.id,
                consultationDate: appointment.consultationDate.toString(),
                name: appointment.fullName,
                mobile: appointment.mobileNumber,
                email: appointment.email,
                bookOn: appointment.createdAt,
                status: appointment.status
            });
        });

        csvStream.end();
    });
}

export default generateCSVString;
