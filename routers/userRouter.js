import express from 'express'
import { createUser, getUser, googleLogin, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();
userRouter.post('/', createUser)
userRouter.post('/login', loginUser)
userRouter.post('/google_login', googleLogin)
userRouter.get('/', getUser)

export default userRouter;