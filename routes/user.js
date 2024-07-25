import express from 'express';
import { getAllUsers, createUser, getUserById, deleteSingleUser, updateUserById, loginUser, logOut, getMe } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/all', getAllUsers);
router.get('/me',isAuthenticated, getMe); // Define this before '/:id'
router.get('/:id', getUserById);
router.delete('/:id', deleteSingleUser);
router.patch('/:id', updateUserById);
router.post('/create', createUser);
router.post('/login', loginUser);
router.post('/logout', logOut);

export default router;
