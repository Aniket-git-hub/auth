// services/csvService.js
import ObjectsToCsv from 'objects-to-csv';

async function generateCSV(data, fileName) {
    try {
        const csv = new ObjectsToCsv(data);
        await csv.toDisk(`./csv/${fileName}.csv`, { append: false });

        return `./csv/${fileName}.csv`;
    } catch (error) {
        console.error('Error generating CSV:', error);
        throw new Error('Failed to generate CSV');
    }
}

module.exports = { generateCSV };
