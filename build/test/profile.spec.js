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
var jwt = 'compadre';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.userModel.deleteMany({});
    const firstUser = new user_model_1.userModel(helper_1.initialUsers[0]);
    const newUser = yield firstUser.save();
    const reponse = yield helper_1.api
        .post('/api/auth/login')
        .send({ email: newUser.email, password: '123456' });
    const { token } = reponse.body;
    jwt = token;
}));
test('Get the profile of an user', () => __awaiter(void 0, void 0, void 0, function* () {
    yield helper_1.api
        .get('/api/profile')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200);
}));
test('Get the profile of an user without token would fail', () => __awaiter(void 0, void 0, void 0, function* () {
    yield helper_1.api.get('/api/profile').set('Authorization', 'bearer').expect(401);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield src_1.serverTerminator.terminate();
}));
