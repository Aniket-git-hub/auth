function isNonBookableDay(date) {
    // Implement logic to check if the date is a non-bookable day
    // Example logic:
    const nonBookableDays = [
        /* List of non-bookable days */
    ];
    return nonBookableDays.includes(date.toDateString());
}

export default isNonBookableDay;
