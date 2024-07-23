import express from 'express';
import { getAllUsers, createUser, getUserById, deleteSingleUser, updateUserById, loginUser } from '../controllers/user.js';

const router = express.Router();

router.get('/all', getAllUsers);
router.post('/create', createUser);
router.get('/:id',getUserById);
router.delete('/:id',deleteSingleUser);
router.patch('/:id',updateUserById);
router.post('/login',loginUser);

export default router;
