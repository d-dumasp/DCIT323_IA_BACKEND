import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cryptoRoutes from './routes/cryptoRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://cryptapp-demo.netlify.app',  // hardcoded production frontend
    process.env.FRONTEND_URL              // also read from env var
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (Postman, curl, server-to-server)
        if (!origin) return callback(null, true);
        // Allow any netlify.app subdomain (covers preview deploys too)
        if (origin.endsWith('.netlify.app') || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        console.log('CORS blocked origin:', origin);
        console.log('Allowed origins:', allowedOrigins);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Crypto App API is running!');
});

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/crypto', cryptoRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});