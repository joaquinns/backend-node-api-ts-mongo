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
exports.findUserById = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const user_model_1 = require("../models/user.model");
const logger_1 = require("../utils/logger");
const getUsers = (page, limit, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id) {
            return yield user_model_1.userModel.findById(id).select('-password');
        }
        page < 1 ? (page = 1) : page;
        limit < 1 ? (limit = 1) : page;
        const users = yield user_model_1.userModel
            .find({ isDelete: false })
            .select('-password')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();
        const total = yield user_model_1.userModel.countDocuments();
        const totalPages = Math.ceil(total / limit);
        return {
            users,
            currentPage: page,
            totalPages
        };
    }
    catch (error) {
        (0, logger_1.loggerError)(`[SERVICE ERROR GETTING USERS] ${error}`);
    }
});
exports.getUsers = getUsers;
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.userModel.create(input);
    }
    catch (error) {
        (0, logger_1.loggerError)(`[SERVICE ERROR CREATING USER] ${error}`);
    }
});
exports.createUser = createUser;
const updateUser = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (input.password) {
            const hashedPassword = yield (0, user_model_1.bcryptHash)(input.password);
            input.password = hashedPassword;
        }
        return yield user_model_1.userModel
            .findByIdAndUpdate(id, input, {
            returnDocument: 'after'
        })
            .select('-password');
    }
    catch (error) {
        (0, logger_1.loggerError)(`[SERVICE ERROR UPDATING USER] ${error}`);
    }
});
exports.updateUser = updateUser;
const deleteUser = (id, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, logger_1.loggerInfo)(`[api/users/${id}] Deleting user`);
        const deleteUser = yield user_model_1.userModel.findOneAndDelete({ _id: id });
        (0, logger_1.loggerInfo)(`USer delete: ${deleteUser}`);
        if (!deleteUser)
            throw Error();
        return deleteUser;
    }
    catch (error) {
        (0, logger_1.loggerError)(`[SERVICE ERROR DELETING USER] ${error}`);
        error.statusCode = 404;
        error.status = 'failed';
        error.message = 'Not found';
        (0, logger_1.loggerError)(`${error}`);
        next(error);
    }
});
exports.deleteUser = deleteUser;
const findUserById = (id, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.userModel.findById(id).select('-password');
        if (!user) {
            throw {
                statusCode: 404,
                message: 'Not found'
            };
        }
        return user;
    }
    catch (error) {
        (0, logger_1.loggerError)(`${error}`);
        next(error);
    }
});
exports.findUserById = findUserById;
