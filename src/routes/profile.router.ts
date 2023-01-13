import express from 'express'
import { profileHandler } from '../controllers/user.controller'
import checkToken from '../middleware/checkToken.middleware'

const profileRoutes = express.Router()

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
profileRoutes.get('/', checkToken, profileHandler)

export default profileRoutes
