import express from 'express';
import * as ChatController from '../controllers/chatController.js';

const router = express.Router();

router.get('/messages', ChatController.messages);

export default router;