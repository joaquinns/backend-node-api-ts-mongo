"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
/**
 * Middleware function to handle the errors of the app
 * @param err - Global error
 * @param req
 * @param res - Response of the express server
 * @param next - Express next function
 */
const ErrorHandler = (err, _req, res, next) => {
    if (!err) {
        next();
    }
    (0, logger_1.loggerError)(`[MIDDLEWARE ERROR HANDLER] ${err.message}`);
    const errStatus = err.statusCode ||
        (((err.message === 'invalid token' && 400) ||
            err.message.includes('Cast to ObjectId failed')) &&
            404) ||
        500;
    const errMsg = err.message || 'Something went wrong';
    const stack = err.stack;
    return res.status(errStatus).send({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? stack : {}
    });
};
exports.default = ErrorHandler;
