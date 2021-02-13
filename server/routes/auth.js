import express from 'express';
import {
  getUser,
  googleLogin,
  login,
  signup,
  updateUser,
  generatePassCode,
  verifyResetCode,
  updatePassword,
} from '../controllers/auth.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/googlelogin', googleLogin);
router.get('/user', requireAuth, getUser);
router.put('/update', requireAuth, updateUser);
router.post('/resetcode/create', generatePassCode);
router.post('/resetcode/verify', verifyResetCode);
router.put('/resetpassword', updatePassword);

export default router;
