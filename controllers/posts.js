import mongoose from 'mongoose';

import PostMessage from '../models/postsMessage.js';

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 2;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .skip(startIndex)
      .limit(LIMIT)
      .sort({ createdAt: -1 })
      .populate('users', '-password')
      .populate('comments.user', '-password');

    return res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  try {
    const newPost = {
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
      users: req.userId,
    };

    const newPostMessage = await new PostMessage(newPost).save();

    const postCreated = await PostMessage.findOne({
      _id: newPostMessage._id,
    })
      .populate('users', '-password')
      .populate('comments.user', '-password');

    return res.status(201).json(postCreated);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;

  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);

  const updatedPost = {
    ...post,
    _id: _id,
    updatedAt: new Date().toISOString(),
    users: req.userId,
  };

  const updated = await PostMessage.findByIdAndUpdate(_id, updatedPost, {
    new: true,
  });

  const postCreated = await PostMessage.findOne({
    _id: updated._id,
  })
    .populate('users')
    .populate('comments.user');

  return res.json(postCreated);
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: 'Unanthenticated' });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);

  const post = await PostMessage.findById(_id);
  const index = post.likes.findIndex(id => id === String(req.userId));

  if (index === -1) post.likes.push(req.userId);
  else post.likes = post.likes.filter(id => id !== String(req.userId));

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  const postCreated = await PostMessage.findOne({
    _id: updatedPost._id,
  })
    .populate('users', '-password')
    .populate('comments.user', '-password');

  return res.json(postCreated);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);

  await PostMessage.findByIdAndRemove(_id);

  return res.json({ message: 'Post deleted successfully' });
};

// Comments
export const commentPost = async (req, res) => {
  const { id: _id } = req.params;
  const { postComment } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id: ${_id}`);

    if (postComment.length < 1)
      return res.status(401).send('Comment should be atleast 1 character');

    const post = await PostMessage.findById(_id);

    if (!post) return res.status(404).send('No Post found');

    const newComment = {
      _id,
      comment: postComment,
      user: req.userId,
      createdAt: Date.now(),
    };

    await post.comments.unshift(newComment);
    await post.save();

    const commentCreated = await PostMessage.findOne({
      _id: post._id,
    }).populate('comments.user');

    return res.status(200).json(commentCreated);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};

export const updateComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentData } = req.body;

  try {
    const posts = await PostMessage.findById(_id);

    // const theComment = posts.comments.find((comment = comment._id === _id));
    const theComment = posts.comments.find(comment => comment._id === _id);
    if (!theComment) return res.status(404).send('Comment not found');

    theComment.comment = commentData;

    await posts.save();

    const commentCreated = await PostMessage.findOne({
      _id: posts._id,
    }).populate('comments.user');

    res.status(200).json(commentCreated);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};

export const deleteComment = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id: ${_id}`);

    const post = await PostMessage.findById(_id);

    if (!post) return res.status(404).send('No Post found');

    const commentIndex = post.comments.findIndex(
      comment => comment._id === _id
    );

    if (commentIndex === -1) {
      return res.status(404).send('Comment not found');
    }

    await post.comments.splice(commentIndex, 1);
    await post.save();

    const commentCreated = await PostMessage.findOne({
      _id: _id,
    }).populate('comments.user');

    return res.status(200).json(commentCreated);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};
