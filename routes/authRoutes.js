import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

// I am implementing these as POST according to RESTful standards and our agreed plan, 
// despite the assignment text listing GET /register and GET /login.
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
