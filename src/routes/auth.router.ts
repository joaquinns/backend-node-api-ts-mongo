import express from 'express'
import {
  authLoginHandler,
  authRegisterHandler
} from '../controllers/auth.controller'
import { validate } from '../middleware/validateResource.middleware'
import { authLoginSchema } from '../schemas/auth.schema'
import { createUserSchema } from '../schemas/user.schema'

const authRoutes = express.Router()
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
  .post(validate(createUserSchema), authRegisterHandler)
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
authRoutes.route('/login').post(validate(authLoginSchema), authLoginHandler)

export default authRoutes
