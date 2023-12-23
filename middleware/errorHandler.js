import CustomError from '../utils/createError.js';

const errorTypeMap = {
    ValidationError: {
        status: 400,
        message: (error) =>
            `Validation Error: ${error instanceof CustomError && error.errors.length > 0
                ? error.errors.join(', ')
                : error.message || 'Invalid input'
            }`,
    },
    NotFoundError: { status: 404, message: "Uh-oh! The resource you're looking for cannot be found." },
    UniqueConstraintError: { status: 409, message: "Hold on! It looks like there's a duplicate key error." },
    JsonWebTokenError: { status: 401, message: 'Hmm... The token provided seems to be invalid.' },
    SyntaxError: { status: 400, message: (error) => `Oops! There seems to be a syntax error: ${error.message}` },
    AuthError: { status: 401, message: (error) => `Uh-oh! There seems to be an auth error: ${error.message}` },
    TokenExpiredError: { status: 401, message: 'Oh no! Your token has expired.' },
    InvalidOTP: { status: 400, message: 'Oh no! Your OTP is invalid.' },
    SendingEmail: { status: 424, message: "Couldn't Send Email..." },

    // Specific errors for login, registration, and booking consultation appointment
    LoginError: { status: 401, message: 'Login failed. Please check your credentials.' },
    RegistrationError: { status: 400, message: 'Registration failed. Please provide valid information.' },
    BookingError: { status: 400, message: 'Booking consultation appointment failed. Please try again.' },
};


function errorHandler(error, req, res, next) {
    let errorInfo;
    const errorType = error.name || error.constructor?.name;
    if (errorType) {
        errorInfo = errorTypeMap[errorType];
    }
    errorInfo = errorInfo || { status: 500, message: 'Internal Server Error' };

    res?.status(errorInfo.status).json({
        message: typeof errorInfo.message === 'function' ? errorInfo.message(error) : errorInfo.message,
    });
    next();
}

export default errorHandler;