"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLoginHandler = exports.authRegisterHandler = void 0;
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
const logger_1 = require("../utils/logger");
/**
 *  Register controller to insert a new user in the database
 * @param req
 * @param res
 * @returns
 */
const authRegisterHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, user_service_1.createUser)(req.body);
        return res.status(201).json(newUser);
    }
    catch (error) {
        (0, logger_1.loggerError)(`[ERROR AUTH REGISTER CONTROLLER] ${error.message}`);
        return res.status(409).send(error.message);
    }
});
exports.authRegisterHandler = authRegisterHandler;
/**
 * Login controller to be authorized in the app
 * @param req
 * @param res
 * @param next
 * @returns
 */
const authLoginHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login = yield (0, auth_service_1.authLogin)(req.body, next);
        if (!login) {
            throw {
                statusCode: 400,
                message: 'Bad request'
            };
        }
        const { token } = login;
        return res.json({ message: 'Login Success!', token });
    }
    catch (error) {
        (0, logger_1.loggerError)(`[ERROR AUTH CONTROLLER] ${error.message}`);
        next(error);
    }
});
exports.authLoginHandler = authLoginHandler;
