import express from 'express'
import { registerUser,loginUser, getProfile,updateProfile,bookappointment,listAppointment ,cancelAppointment,paymentRazorpay,verifyRazorpay} from '../Controllers/userController'
import authUser from '../middlewares/authUser'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authuser,bookappointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)





export default userRouter