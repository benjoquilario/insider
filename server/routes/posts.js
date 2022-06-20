import express from 'express';

import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/comment', auth, commentPost);

export default router;
