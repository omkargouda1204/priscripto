import express from 'express';
// doctorRoute.js
import { doctorList,loginDoctor } from '../Controllers/doctorController.js';

const router = express.Router();

router.get('/list', doctorList);
router.post('/login',loginDoctor)
export default router;
