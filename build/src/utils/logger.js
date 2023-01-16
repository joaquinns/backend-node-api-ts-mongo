"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerWarning = exports.loggerError = exports.loggerSuccess = exports.loggerInfo = void 0;
const loggerInfo = (msg) => {
    console.log(`[INFO]: ${msg}`);
};
exports.loggerInfo = loggerInfo;
const loggerSuccess = (msg) => {
    console.log(`[SUCCESS]: ${msg}`);
};
exports.loggerSuccess = loggerSuccess;
const loggerError = (msg) => {
    console.log(`[ERROR]: ${msg}`);
};
exports.loggerError = loggerError;
const loggerWarning = (msg) => {
    console.log(`[WARNING]: ${msg}`);
};
exports.loggerWarning = loggerWarning;
