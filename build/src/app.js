"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./docs/swagger"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const index_1 = __importDefault(require("./routes/index"));
// create server
exports.app = (0, express_1.default)();
// config
exports.app.set('port', process.env.PORT || 8080);
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
// security
exports.app.use((0, helmet_1.default)());
// app.use(cors())
// routes
// define /api prefix in all the routes
exports.app.use('/api', index_1.default);
// api documentation endpoint
exports.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.app.use(errorHandler_1.default);
// redirects
exports.app.get('/', (_req, res) => res.redirect('/docs'));
