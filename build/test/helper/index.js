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
exports.getUsersResponse = exports.initialUsers = exports.api = void 0;
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../../src");
exports.api = (0, supertest_1.default)(src_1.server);
exports.initialUsers = [
    {
        name: 'Test user 1',
        email: 'testUser1@mail.com',
        password: '123456'
    },
    {
        name: 'Test user 2',
        email: 'testUser2@mail.com',
        password: '123456'
    }
];
const getUsersResponse = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield exports.api.get('/api/users');
    const { users } = response.body;
    const usersId = users.map((user) => user._id);
    const userEmails = users.map((user) => user.email);
    return { users, usersId, userEmails };
});
exports.getUsersResponse = getUsersResponse;
