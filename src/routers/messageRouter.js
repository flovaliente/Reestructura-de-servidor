import { Router } from 'express';
import messageController from '../controllers/messageController.js';

const router = Router();

router.get('/', messageController.renderMessage);

export default router;