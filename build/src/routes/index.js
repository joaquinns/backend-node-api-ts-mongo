"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkToken_middleware_1 = __importDefault(require("../middleware/checkToken.middleware"));
const auth_router_1 = __importDefault(require("./auth.router"));
const profile_router_1 = __importDefault(require("./profile.router"));
const user_router_1 = __importDefault(require("./user.router"));
let server = (0, express_1.default)();
server.use('/users', user_router_1.default); // api/users
server.use('/auth', auth_router_1.default); // api/auth
server.use('/profile', [checkToken_middleware_1.default], profile_router_1.default); // api/profile
exports.default = server;
