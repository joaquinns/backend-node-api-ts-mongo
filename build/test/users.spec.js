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
var jwt = 'token';
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.userModel.deleteMany({});
    const firstUser = new user_model_1.userModel(helper_1.initialUsers[0]);
    const savedUser = yield firstUser.save();
    const secondUser = new user_model_1.userModel(helper_1.initialUsers[1]);
    yield secondUser.save();
    const reponse = yield helper_1.api
        .post('/api/auth/login')
        .send({ email: savedUser.email, password: '123456' });
    const { token } = reponse.body;
    jwt = token;
}));
test('Users are returned as json format', () => __awaiter(void 0, void 0, void 0, function* () {
    yield helper_1.api
        .get('/api/users')
        .expect(200)
        .expect('Content-type', /application\/json/);
}));
test('Get one user', () => __awaiter(void 0, void 0, void 0, function* () {
    const { usersId } = yield (0, helper_1.getUsersResponse)();
    const userId = usersId[0];
    yield helper_1.api.get(`/api/users?id=${userId}`).expect(200);
    expect(userId).toContain(userId);
}));
test(`Theres ${helper_1.initialUsers.length} users in the api`, () => __awaiter(void 0, void 0, void 0, function* () {
    const { users } = yield (0, helper_1.getUsersResponse)();
    expect(users).toHaveLength(helper_1.initialUsers.length);
}));
test('Create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        name: 'New user added',
        password: '123456',
        passwordConfirmation: '123456',
        email: 'newuseremail@mail.com'
    };
    yield helper_1.api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-type', /application\/json/);
    const { users, userEmails } = yield (0, helper_1.getUsersResponse)();
    expect(users).toHaveLength(helper_1.initialUsers.length + 1);
    expect(userEmails).toContain(newUser.email);
}));
test('Create a new user fail without body', () => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {};
    yield helper_1.api
        .post('/api/users')
        .send(newUser)
        .expect(409)
        .expect('Content-type', /application\/json/);
}));
test('Update an user', () => __awaiter(void 0, void 0, void 0, function* () {
    const { usersId } = yield (0, helper_1.getUsersResponse)();
    const userId = usersId[0];
    const updateInputs = {
        name: 'exampleTestName'
    };
    yield helper_1.api
        .put(`/api/users?id=${userId}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send(updateInputs)
        .expect(200);
    const { users } = yield (0, helper_1.getUsersResponse)();
    const updatedUser = users.filter((user) => user._id === userId);
    expect(updatedUser[0].name).toContain(updateInputs.name);
}));
test('Update an user without id would fail', () => __awaiter(void 0, void 0, void 0, function* () {
    const updateInputs = {
        name: 'exampleTestName'
    };
    yield helper_1.api
        .put(`/api/users`)
        .set('Authorization', `Bearer ${jwt}`)
        .send(updateInputs)
        .expect(400);
}));
test('Update an user with a invalid id would fail', () => __awaiter(void 0, void 0, void 0, function* () {
    const id = '1234567';
    const updateInputs = {
        name: 'exampleTestName'
    };
    yield helper_1.api
        .put(`/api/users?id=${id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send(updateInputs)
        .expect(404);
}));
test('Delete an user without id or not a valid id would fail', () => __awaiter(void 0, void 0, void 0, function* () {
    yield helper_1.api.delete(`/api/users`).set('Authorization', `Bearer`).expect(401);
}));
test('Delete an user', () => __awaiter(void 0, void 0, void 0, function* () {
    const { users } = yield (0, helper_1.getUsersResponse)();
    const usersId = users.map((user) => user._id);
    console.log(usersId);
    const userIdToDelete = usersId[0];
    yield helper_1.api
        .delete(`/api/users?id=${userIdToDelete}`)
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200);
    const { users: usersAfterDelete, usersId: usersIdAfterDelete } = yield (0, helper_1.getUsersResponse)();
    expect(usersAfterDelete).toHaveLength(helper_1.initialUsers.length - 1);
    expect(usersIdAfterDelete).not.toContain(userIdToDelete);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield src_1.serverTerminator.terminate();
}));
