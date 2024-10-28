import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
    try {
        // Debug log to check environment variables
        console.log("Cloudinary Config:", {
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: Boolean(process.env.CLOUDINARY_SECRET_KEY) // Just log if secret exists
        });

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });
        console.log("Cloudinary connected successfully");
    } catch (error) {
        console.error("Cloudinary connection failed:", error);
        // Log more detailed error
        console.error("Error details:", {
            message: error.message,
            stack: error.stack
        });
    }
};

export default connectCloudinary;
