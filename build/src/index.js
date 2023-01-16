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
exports.serverTerminator = exports.server = void 0;
const http_terminator_1 = require("http-terminator");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const logger_1 = require("./utils/logger");
const DB_URI = process.env.NODE_ENV === 'test'
    ? process.env.DB_URI_TEST
    : process.env.DB_URI;
mongoose_1.default.set('strictQuery', true);
function db() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(DB_URI);
            (0, logger_1.loggerInfo)('[DB] CONNECTION UP');
            (0, logger_1.loggerSuccess)('[DB] SUCCESS!');
        }
        catch (error) {
            (0, logger_1.loggerError)(`[SERVER ERROR]: ${error}`);
        }
    });
}
db();
exports.server = app_1.app.listen(app_1.app.get('port'), () => {
    (0, logger_1.loggerInfo)(`[SERVER RUNNING] listening on port ${app_1.app.get('port')}`);
});
exports.serverTerminator = (0, http_terminator_1.createHttpTerminator)({
    server: exports.server
});
