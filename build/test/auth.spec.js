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
const src_1 = require("../src");
const user_model_1 = require("../src/models/user.model");
const helper_1 = require("./helper");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.userModel.deleteMany({});
    const firstUser = new user_model_1.userModel(helper_1.initialUsers[0]);
    yield firstUser.save();
}));
test('Register an user in the app', () => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        name: 'testingName',
        email: 'testingEmail@mail.com',
        password: '123456',
        passwordConfirmation: '123456'
    };
    yield helper_1.api.post('/api/auth/register').send(newUser).expect(201);
    const { users, userEmails } = yield (0, helper_1.getUsersResponse)();
    expect(users).toHaveLength(2);
    expect(userEmails).toContain(newUser.email);
}));
test('Register an user in the app without body would fail', () => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {};
    yield helper_1.api.post('/api/auth/register').send(newUser).expect(409);
}));
test('Login a valid user in the app', () => __awaiter(void 0, void 0, void 0, function* () {
    const loginUser = {
        email: 'testUser1@mail.com',
        password: '123456'
    };
    yield helper_1.api.post('/api/auth/login').send(loginUser).expect(200);
}));
test('Login with a invalid email or password would fail', () => __awaiter(void 0, void 0, void 0, function* () {
    const loginUser = {
        email: 'testUser111111@mail.com',
        password: '1234567'
    };
    yield helper_1.api.post('/api/auth/login').send(loginUser).expect(403);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield src_1.serverTerminator.terminate();
}));
