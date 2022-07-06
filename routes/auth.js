import express from 'express';

import { signin, signup, autheticatedUser } from '../controllers/auth.js';

const router = express.Router();
import auth from '../middleware/auth.js';

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/login/user', auth, autheticatedUser);

export default router;
