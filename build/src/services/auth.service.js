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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLogin = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const logger_1 = require("../utils/logger");
const authLogin = (auth, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundedUser = yield user_model_1.userModel.findOne({ email: auth.email });
        if (!foundedUser) {
            throw {
                statusCode: 403,
                message: 'email or password incorrect'
            };
        }
        const validPassword = yield foundedUser.comparePasswords(auth.password);
        if (!validPassword) {
            (0, logger_1.loggerInfo)('No paso huele bicho');
            throw {
                statusCode: 403,
                message: 'email or password incorrect'
            };
        }
        const token = yield jsonwebtoken_1.default.sign({
            id: foundedUser.id
        }, process.env.SECRET, {
            expiresIn: 86400
        });
        return { token };
    }
    catch (error) {
        (0, logger_1.loggerError)(`[ERROR AUTH LOGIN SERVICE] ${(error.message, (error === null || error === void 0 ? void 0 : error.stack) && error.stack)}`);
        next(error);
    }
});
exports.authLogin = authLogin;
