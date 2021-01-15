import express from 'express';
import { getUser, googleLogin, login, signup } from '../controllers/auth.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/googlelogin', googleLogin);
router.get('/user', requireAuth, getUser);
export default router;
