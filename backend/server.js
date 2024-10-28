import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './Config/mongodb.js';
import connectCloudinary from './Config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;

// Connect to services
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());  // Call express.json() as a function
app.use(cors());           // Use cors() instead of cros()

// API endpoints
app.use('/api/admin',adminRouter)


app.get('/', (req, res) => {
    res.send('API WORKING ');
});

// Start the server
app.listen(port, () => console.log('Server started ' ,port ));
