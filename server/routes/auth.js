import express from 'express';
import {
  getUser,
  googleLogin,
  login,
  signup,
  getUserInfo,
  updateUser,
  resetPassword,
} from '../controllers/auth.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/googlelogin', googleLogin);
router.get('/user', requireAuth, getUser);
router.put('/update', requireAuth, updateUser);
router.get('/user/allinfo', requireAuth, getUserInfo);
router.post('/resetPassword', resetPassword);
export default router;
