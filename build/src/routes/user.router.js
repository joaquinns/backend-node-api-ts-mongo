"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const checkToken_middleware_1 = __importDefault(require("../middleware/checkToken.middleware"));
const validateResource_middleware_1 = require("../middleware/validateResource.middleware");
const user_schema_1 = require("../schemas/user.schema");
const userRoutes = express_1.default.Router();
/**
 * Get track
 * @openapi
 * /api/users:
 *    get:
 *      tags:
 *        - users
 *      summary: "Get all the users or one user"
 *      description: This endpoint is for get all the users or only one by id from the database
 *      parameters:
 *          - name: id
 *            in: query
 *            description: id of the user
 *            schema:
 *              type: string
 *            required: false
 *      responses:
 *        '200':
 *          description: Return the new user in inserted in the database
 *        '400':
 *          description: Error api
 *      security:
 *       - ffofofof: []
 */
userRoutes.route('/').get(user_controller_1.getUserHandler);
/**
 * Post track
 * @openapi
 * /api/users:
 *    post:
 *      tags:
 *        - users
 *      summary: "Create a new user"
 *      description: This endpoint is for create an user
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
 *      security:
 *       - ffofofof: []
 */
userRoutes.route('/').post((0, validateResource_middleware_1.validate)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
/**
 * Put track
 * @openapi
 * /api/users:
 *    put:
 *      tags:
 *        - users
 *      summary: "Update an user"
 *      description: This endpoint is for update a field of an user
 *      parameters:
 *          - name: id
 *            in: query
 *            description: id of the user
 *            schema:
 *              type: string
 *            required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *          required: false
 *      responses:
 *        '200':
 *          description: Return the new user in inserted in the database
 *        '400':
 *          description: Validation error trying to save the user in the database
 *        '404':
 *          description: User not found or not valid id
 *        '401':
 *          description: Unauthorized to make the request
 *      security:
 *       - bearerAuth: []
 */
userRoutes
    .route('/')
    .put([checkToken_middleware_1.default, (0, validateResource_middleware_1.validate)(user_schema_1.updateUserSchema)], user_controller_1.updateUserHandler);
/**
 * Delete track
 * @openapi
 * /api/users:
 *    delete:
 *      tags:
 *        - users
 *      summary: "Delete an user"
 *      description: This endpoint is for delete an user from the database
 *      parameters:
 *          - name: id
 *            in: query
 *            description: id of the user
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *        '200':
 *          description: Return the new user in inserted in the database
 *        '400':
 *          description: Validation error trying to save the user in the database
 *        '404':
 *          description: User not found or not valid id
 *        '401':
 *          description: Unauthorized to make the request
 *      security:
 *       - bearerAuth: []
 */
userRoutes.route('/').delete(checkToken_middleware_1.default, user_controller_1.deleteUserHandler);
exports.default = userRoutes;
