import express from 'express';
import { getAllUsers, createUser, getUserById, deleteSingleUser, updateUserById } from '../controllers/user.js';

const router = express.Router();

router.get('/all', getAllUsers);
router.post('/create', createUser);
router.get('/:id',getUserById);
router.delete('/:id',deleteSingleUser);
router.patch('/:id',updateUserById);

export default router;
