import express from 'express';
import { 
    addDoctor, 
    allDoctors, 
    loginAdmin, 
    getAllAppointments,  // Corrected import
    appointmentCancel, 
    adminDashboard 
} from '../Controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../Controllers/doctorController.js'; // Corrected import

const router = express.Router();

router.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
router.post('/login', loginAdmin);
router.post('/all-doctors', authAdmin, allDoctors);
router.post('/change-availability', authAdmin, changeAvailability); // Corrected function name
router.get('/appointments', authAdmin, getAllAppointments); // Corrected function name
router.post('/cancel-appointment', authAdmin, appointmentCancel);
router.get('/dashboard', authAdmin, adminDashboard);

export default router;
