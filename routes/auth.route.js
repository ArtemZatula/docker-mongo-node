
import { signUp, login, logout } from '../controllers/auth.controller.js'
import { Router } from 'express'

export const authRouter = Router()
authRouter.route('/signup').post(signUp)
authRouter.route('/login').post(login)
authRouter.route('/logout').post(logout)