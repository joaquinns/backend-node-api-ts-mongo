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
exports.profileHandler = exports.deleteUserHandler = exports.updateUserHandler = exports.createUserHandler = exports.getUserHandler = void 0;
const user_service_1 = require("../services/user.service");
const logger_1 = require("../utils/logger");
/**
 * Get users controller to retrieve all the users or one user from the database
 *
 * @param req
 * @param res
 * @returns
 */
const getUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.query.id;
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 15;
        const users = yield (0, user_service_1.getUsers)(page, limit, id);
        if (!users) {
            throw {
                statusCode: 404,
                message: 'User not found in our records'
            };
        }
        return res.json(users);
    }
    catch (error) {
        (0, logger_1.loggerError)(`[ERROR CONTROLLER] ${error.message}`);
        next(error);
    }
});
exports.getUserHandler = getUserHandler;
/**
 * Create user controller to insert a new user into the database
 *
 * @param req
 * @param res
 * @returns
 */
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, user_service_1.createUser)(req.body);
        return res.status(201).json(newUser);
    }
    catch (error) {
        (0, logger_1.loggerError)(`[ERROR CONTROLLER] ${error}`);
        res.status(409).json(error.message);
    }
});
exports.createUserHandler = createUserHandler;
/**
 * Update user controller to change any input of an user
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
const updateUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        if (!id) {
            throw {
                statusCode: 400,
                message: 'You need to pass an id'
            };
        }
        const foundedUser = yield (0, user_service_1.findUserById)(id, next);
        if (!foundedUser) {
            throw {
                statusCode: 404,
                message: 'User not found in our records'
            };
        }
        const { user } = req;
        if (user !== id) {
            throw {
                statusCode: 401,
                message: 'Unauthorized'
            };
        }
        const updatedUser = yield (0, user_service_1.updateUser)(id, req.body);
        return res.json(updatedUser);
    }
    catch (error) {
        (0, logger_1.loggerError)(`[ERROR CONTROLLER] ${error}`);
        next(error);
    }
});
exports.updateUserHandler = updateUserHandler;
/**
 * Delete controller to delete an user from the database
 * @param req
 * @param res
 * @param next
 * @returns
 */
const deleteUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const { user } = req;
        if (user !== id) {
            throw {
                statusCode: 401,
                message: 'Unauthorized'
            };
        }
        const deletedUser = yield (0, user_service_1.deleteUser)(id, next);
        if (!deletedUser) {
            throw {
                statusCode: 404,
                message: 'User not found in our records'
            };
        }
        return res.json({ status: 200, message: 'Deleted success!' });
    }
    catch (error) {
        (0, logger_1.loggerError)(`[ERROR CONTROLLER] ${error}`);
        next(error);
    }
});
exports.deleteUserHandler = deleteUserHandler;
/**
 * Get profile controller to see the profile of the user logged
 * @param req
 * @param res
 * @param next
 * @returns
 */
const profileHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user;
        const user = yield (0, user_service_1.findUserById)(id, next);
        return res.json({ message: `Welcome ${user === null || user === void 0 ? void 0 : user.name}`, user });
    }
    catch (error) {
        error.message = 'Something went wrong';
        next(error);
    }
});
exports.profileHandler = profileHandler;
