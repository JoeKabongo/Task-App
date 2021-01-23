import express from 'express';
import { createCategory } from '../controllers/category.js';
import requireAuth from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/create', requireAuth, createCategory);
export default router;
