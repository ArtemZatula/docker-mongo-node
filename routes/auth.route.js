import express from 'express'

import { signUp, login} from '../controllers/auth.controller.js';

const router = express.Router();
router.route('/signup').post(signUp)
router.route('/login').post(login)
export default router