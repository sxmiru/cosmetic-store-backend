import express from 'express'
import { createUser, getUser, googleLogin, loginUser, resetPassword, sendOTP } from '../controllers/userController.js';

const userRouter = express.Router();
userRouter.post('/', createUser)
userRouter.post('/login', loginUser)
userRouter.post('/google_login', googleLogin)
userRouter.post('/send-otp', sendOTP)
userRouter.post('/reset-password', resetPassword)
userRouter.get('/', getUser)

export default userRouter;