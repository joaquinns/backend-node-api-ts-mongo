import express from 'express'

const userRoutes = express.Router()

userRoutes.get('/', (_req, res) => res.send('GET USERS'))

export default userRoutes
