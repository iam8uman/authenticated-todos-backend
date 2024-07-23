import express from 'express';
import { createTask, deleteSingleTask, getAllTasks, getTaskById, updateTaskById } from '../controllers/task.js';

const router = express.Router();

router.get('/all', getAllTasks);
router.post('/create', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTaskById);
router.delete('/:id', deleteSingleTask);

export default router;
