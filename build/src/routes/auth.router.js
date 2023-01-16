"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validateResource_middleware_1 = require("../middleware/validateResource.middleware");
const auth_schema_1 = require("../schemas/auth.schema");
const user_schema_1 = require("../schemas/user.schema");
const authRoutes = express_1.default.Router();
/**
 * Post track
 * @openapi
 * /api/auth/register:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Register a new user in the app"
 *      description: This endpoint is for register an user
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *          required: true
 *      responses:
 *        '201':
 *          description: Return the new user in inserted in the database
 *        '409':
 *          description: Validation error trying to save the user in the database
 *        '400':
 *          description: Bad request in the app
 *      security:
 *       - ffofofof: []
 */
authRoutes
    .route('/register')
    .post((0, validateResource_middleware_1.validate)(user_schema_1.createUserSchema), auth_controller_1.authRegisterHandler);
/**
 * Post track
 * @openapi
 * /api/auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Authorization login"
 *      description: This endpoint is for login in the app
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/auth"
 *          required: true
 *      responses:
 *        '200':
 *          description: Return the token for the session
 *        '403':
 *          description: Email or password incorrect
 *        '400':
 *          description: Bad request
 *      security:
 *       - ffofofof: []
 */
authRoutes.route('/login').post((0, validateResource_middleware_1.validate)(auth_schema_1.authLoginSchema), auth_controller_1.authLoginHandler);
exports.default = authRoutes;
