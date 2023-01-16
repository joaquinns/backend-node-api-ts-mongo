"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const checkToken_middleware_1 = __importDefault(require("../middleware/checkToken.middleware"));
const profileRoutes = express_1.default.Router();
/**
 * Get track
 * @openapi
 * /api/profile:
 *    get:
 *      tags:
 *        - profile
 *      summary: "My profile info"
 *      description: This endpoint is for get the user info
 *      responses:
 *        '200':
 *          description: Return the new user in inserted in the database
 *        '400':
 *          description: Error api
 *        '401':
 *          description: Unauthorized
 *      security:
 *       - bearerAuth: []
 */
profileRoutes.get('/', checkToken_middleware_1.default, user_controller_1.profileHandler);
exports.default = profileRoutes;
