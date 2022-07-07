import express from 'express'
const app = express.Router()

// import controller
import * as controllers from '../controllers/users'

app.post('/login', controllers.login)

export default app