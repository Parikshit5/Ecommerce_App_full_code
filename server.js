import express from "express";
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from "cors";
import path from 'path';
import {fileURLToPath} from 'url';


// Configure env
dotenv.config({ path: 'H:\\web dev\\React\\mern_projects\\ecommerce\\.env' });

// Extract the port from environment variables
const port = process.env.server_port;

// Configure database
connectDB();

//esmodule fix
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.bgBlue.white);
});






//always remember the port name in env file and in the server.js file must not be same.
