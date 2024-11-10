import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import JWT from "jsonwebtoken";
import appointmentModel from "../models/appointmentModule.js";
import userModel from "../models/userModel.js";

// Removed duplicate declaration of `addDoctor`
// import { addDoctor, allDoctors, loginAdmin, appointmentCancel, adminDashboard } from '../Controllers/adminController.js'; // Not needed

// Api for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Check if all required fields are provided
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hash the doctor's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Create a new doctor document
        const newDoctor = new doctorModel({
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees: Number(fees),
            address,
            date: Date.now(),
            available: true,
        });

        // Save doctor to database
        await newDoctor.save();

        return res.status(201).json({
            success: true,
            message: "Doctor added successfully",
            doctor: {
                name: newDoctor.name,
                email: newDoctor.email,
                speciality: newDoctor.speciality,
            },
        });
    } catch (error) {
        console.error("Error in addDoctor:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add doctor",
            error: error.message,
        });
    }
};

// Api for admin log
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email, password });

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = JWT.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({
                success: true,
                token,
                message: 'Login successful'
            });
        } else {
            res.json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Api to get all doctors list
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password");
        res.json({ success: true, doctors });
    } catch (error) {
        console.log("Error fetching doctors:", error);
        res.json({ success: false, message: error.message });
    }
};

// Api to get all appointments list
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments });
    } catch (error) {
        console.log("Error fetching appointments:", error);
        res.json({ success: false, message: error.message });
    }
};

// API to cancel appointment
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);

        let slotsBooked = doctorData.slots_booked || {};
        slotsBooked[slotDate] = slotsBooked[slotDate].filter((e) => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });

        res.json({ success: true, message: "Appointment cancelled" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Api to get dashboard data for admin
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addDoctor, loginAdmin, allDoctors, getAllAppointments, appointmentCancel, adminDashboard };
