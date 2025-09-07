// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err);

    let message = err.message || 'Server Error';
    let statusCode = err.statusCode || 500;

    // Handle Axios errors
    if (err.response?.data) {
        // eslint-disable-next-line no-undef
        status = err.response.status || statusCode;
        message = err.response.data.error_message || message;        
    }

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

module.exports = { errorHandler };
