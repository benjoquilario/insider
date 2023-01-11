import express from 'express';
import {
  updateProfile,
  getUserWithPost,
  getAllUsers,
  getUser,
  getFollowersById,
  getFollowingById,
  followUser,
  unFollowUser,
  searchUser,
} from '../controllers/users.js';

const router = express.Router();

import auth from '../middleware/auth.js';

router.patch('/:id/updateProfile', auth, updateProfile);
router.get('/:id/posts', auth, getUserWithPost);
router.get('/:id/user', auth, getUser);
router.get('/users/all', getAllUsers);
router.patch('/:id/follow', auth, followUser);
router.patch('/:id/unfollow', auth, unFollowUser);
router.get('/:id/followers', auth, getFollowersById);
router.get('/:id/following', auth, getFollowingById);
router.get('/search', auth, searchUser);

export default router;
