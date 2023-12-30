const errorTypeMap = {
    JsonWebTokenError: {
        status: 401,
        message: 'The token provided seems to be invalid.'
    },
    Validation: { status: 401, message: (error) => error.errors },
    LoginError: { status: 401, message: (error) => error.message },
    SequelizeUniqueConstraintError: {
        status: 401,
        message: (error) => error.errors[0].message
    },
    SyntaxError: { status: 401, message: (error) => 'Invalid Syntax' },
    AppointmentBooking: { status: 401, message: (error) => error.message },
    AddCourse: { status: 401, message: (error) => error.message },
    EnrollmentError: { status: 401, message: (error) => error.message }
};

function errorHandler(error, req, res, next) {
    let errorInfo;
    const errorType = error.name || error.constructor?.name;
    if (errorType) {
        errorInfo = errorTypeMap[errorType];
    }
    console.log(error);
    errorInfo = errorInfo || { status: 500, message: 'Internal Server Error' };
    res?.status(errorInfo.status).json({
        message:
            typeof errorInfo.message === 'function'
                ? errorInfo.message(error)
                : errorInfo.message
    });
    next();
}

export default errorHandler;
