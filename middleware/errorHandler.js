const { constants } = require('../constants');

const { VALIDATION_ERROR, FORBIDDEN, UNAUTHORIZED, NOT_FOUND, SERVER_ERROR} = constants;
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
        case UNAUTHORIZED: 
            res.json({
                title: "Un Authorized",
                message: err.message,
                stackTrace: err.stack
            })
        case FORBIDDEN:
            res.json({
                title: 'Forbidden',
                message: err.message,
                stackTrace: err.stack
            })
        case NOT_FOUND:
            res.json({
                title: 'Not Found',
                message: err.message,
                stackTrace: err.stack
            })
        case SERVER_ERROR:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stack
            })
        default:
            console.log('No error, all good...!');
            break;
    }
}

module.exports = errorHandler;