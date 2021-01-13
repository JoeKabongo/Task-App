import express from 'express';
import { googleLogin, login, signup } from '../controllers/auth.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/googlelogin', googleLogin);
export default router;
