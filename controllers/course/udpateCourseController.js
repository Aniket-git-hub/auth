
async function updateCourseController(req, res, next) {
    try {
        const { fullName, email, mobileNumber, consultationDate } = req.body;

        res.status(201).json({ message: "New appointment booked." });
    } catch (error) {
        next(error);
    }
}

export default updateCourseController;