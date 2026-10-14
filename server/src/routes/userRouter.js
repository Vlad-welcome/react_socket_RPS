import express from 'express';
import * as UserController from '../controllers/userController.js';

const router = express.Router();

router.get('/users', UserController.users);

export default router;