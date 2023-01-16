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
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../utils/logger");
const checkToken = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtFromTheUser = req.headers.authorization;
        if (!jwtFromTheUser) {
            throw {
                statusCode: 401,
                message: 'Unauthorized'
            };
        }
        const token = jwtFromTheUser.split(' ').pop();
        const valid = (yield jsonwebtoken_1.default.verify(token, process.env.SECRET));
        if (!valid) {
            throw {
                statusCode: 401,
                message: 'Unauthorized'
            };
        }
        req.user = valid.id;
        next();
    }
    catch (error) {
        (0, logger_1.loggerError)(`[ERROR CHECK TOKEN MIDDLEWARE] ${(error.message, error.stack)}`);
        error.statusCode = 401;
        error.message = 'Unauthorized';
        next(error);
    }
});
exports.default = checkToken;
