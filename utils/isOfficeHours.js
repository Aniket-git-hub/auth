function isOfficeHours(date) {
    // Implement logic to check if the time is during office hours
    // Example logic:
    const hours = date.getHours();
    return hours >= 9 && hours < 17; // Assuming office hours are from 9 AM to 5 PM
}

export default isOfficeHours;
