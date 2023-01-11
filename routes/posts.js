import express from 'express';

import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  updateComment,
  deleteComment,
} from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/comment', auth, commentPost);
router.patch('/:id/updateComment', auth, updateComment);
router.delete('/:id/deleteComment', auth, deleteComment);

export default router;
