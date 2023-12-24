function isWorkingDay(date) {
    // Implement logic to check if the date is a working day (Monday to Friday)
    // Example logic:
    const dayOfWeek = date.getDay(); // 0 is Sunday, 1 is Monday, etc.
    return dayOfWeek >= 1 && dayOfWeek <= 5;
}

export default isWorkingDay
