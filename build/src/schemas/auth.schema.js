"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLoginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.authLoginSchema = zod_1.default.object({
    email: zod_1.default.string({
        required_error: 'Email is required to login'
    }),
    password: zod_1.default.string({
        required_error: 'Password is required to login'
    })
});
