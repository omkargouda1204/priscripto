import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"



// Api for adding doctor
export const addDoctor = async(req,res) => {
    try {
        // Clean up field names by trimming whitespace
        const cleanBody = Object.fromEntries(
            Object.entries(req.body).map(([key, value]) => [key.trim(), value])
        );

        const {name,email,password,speciality,degree,experience,about,fees,address} = cleanBody
        const imageFile = req.file

        // Parse address if it's a string
        let parsedAddress = address;
        try {
            if (typeof address === 'string') {
                // Remove the template literal quotes if present
                const cleanAddressStr = address.replace(/`/g, '').replace(/"/g, '');
                parsedAddress = eval(`(${cleanAddressStr})`); // Be careful with eval in production
            }
        } catch (error) {
            console.error("Error parsing address:", error);
            return res.json({ 
                success: false, 
                message: "Invalid address format"
            });
        }

        // Debug log to see cleaned data
        console.log("Cleaned request body:", {
            name,email,password,speciality,degree,experience,about,fees,parsedAddress
        });

        //checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !parsedAddress || !imageFile) {
            return res.json({ 
                success: false, 
                message: "Missing Details",
                missing: {
                    name: !name,
                    email: !email,
                    password: !password,
                    speciality: !speciality,
                    degree: !degree,
                    experience: !experience,
                    about: !about,
                    fees: !fees,
                    address: !parsedAddress,
                    imageFile: !imageFile
                }
            });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        // Create new doctor document
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
            address: parsedAddress,
            date: Date.now(),
            available: true
        })

        // Save doctor to database
        await newDoctor.save()

        return res.status(201).json({
            success: true,
            message: "Doctor added successfully",
            doctor: {
                name: newDoctor.name,
                email: newDoctor.email,
                speciality: newDoctor.speciality
            }
        })

    } catch (error){
        console.error("Error in addDoctor:", error)
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error",
            error: error.message 
        });
    }
}
