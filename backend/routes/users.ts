import express from 'express'
const app = express.Router()

// import controller
import * as controllers from '../controllers/users'

// import middleware
import {checkJWT, getEmail} from '../middleware'

app.post('/login', checkJWT, getEmail, controllers.login)
app.post('/calendars', checkJWT, getEmail, controllers.getCalendars)

export default app