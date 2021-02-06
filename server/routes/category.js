import express from 'express';
import {
  createCategory,
  getCategories,
  deleteCategories,
} from '../controllers/category.js';
import requireAuth from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/create', requireAuth, createCategory);
router.get('/all', requireAuth, getCategories);
router.delete('/delete', requireAuth, deleteCategories);
export default router;
