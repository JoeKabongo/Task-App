import express from 'express';
import {
  getUser,
  googleLogin,
  login,
  signup,
  deleteAllUser,
  getUserInfo,
} from '../controllers/auth.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/googlelogin', googleLogin);
router.get('/user', requireAuth, getUser);
router.get('/user/allinfo', requireAuth, getUserInfo);
router.delete('/delete/all', deleteAllUser);
export default router;
