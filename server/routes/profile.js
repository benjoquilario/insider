import express from 'express';
import { updateProfile, getProfile } from '../controllers/profile.js';

const router = express.Router();

import auth from '../middleware/auth.js';

router.patch('/:id/updateProfile', auth, updateProfile);
router.get('/:id', getProfile);

export default router;
