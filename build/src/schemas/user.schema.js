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
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_model_1 = require("../models/user.model");
exports.createUserSchema = zod_1.default
    .object({
    name: zod_1.default
        .string({
        required_error: 'Name is required'
    })
        .min(3, 'Name must have at least 3 characters'),
    email: zod_1.default
        .string({ required_error: 'Email is required' })
        .email('Must be a valid email')
        .refine((email) => __awaiter(void 0, void 0, void 0, function* () {
        const foundedEmail = yield user_model_1.userModel.findOne({ email: email });
        if (foundedEmail) {
            return false;
        }
        return true;
    }), {
        message: 'Email is in use',
        path: ['Email']
    }),
    password: zod_1.default
        .string({
        required_error: 'Password is required'
    })
        .min(6, 'Password must have at least 6 characters'),
    passwordConfirmation: zod_1.default.string({
        required_error: 'You need to confirm the password'
    })
})
    .refine((data) => data.password === data.passwordConfirmation, {
    path: ['password'],
    message: 'Passwords dont match'
});
const updateSchema = zod_1.default.object({
    name: zod_1.default
        .string({
        required_error: 'Name is required'
    })
        .min(3, 'Name must have at least 3 characters'),
    email: zod_1.default
        .string({ required_error: 'Email is required' })
        .email('Must be a valid email')
        .refine((email) => __awaiter(void 0, void 0, void 0, function* () {
        const foundedEmail = yield user_model_1.userModel.findOne({ email: email });
        if (foundedEmail) {
            return false;
        }
        return true;
    }), {
        message: 'Email is in use',
        path: ['Email']
    }),
    password: zod_1.default
        .string({
        required_error: 'Password is required'
    })
        .min(6, 'Password must have at least 6 characters'),
    passwordConfirmation: zod_1.default.string({
        required_error: 'You need to confirm the password'
    })
});
exports.updateUserSchema = updateSchema
    .partial()
    .refine((data) => data.password === data.passwordConfirmation, {
    path: ['password'],
    message: 'Passwords dont match'
});
