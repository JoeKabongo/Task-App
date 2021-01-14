import express from 'express';
import { getTasks, createTask } from '../controllers/task.js';
import requireAuth from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', requireAuth, getTasks);
router.post('/create', requireAuth, createTask);

export default router;
