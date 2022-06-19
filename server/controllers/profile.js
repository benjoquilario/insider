import mongoose from 'mongoose';

import PostMessage from '../models/postsMessage.js';
import UserModel from '../models/user.js';

export const getProfile = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const post = await PostMessage.find({ creator: _id }).populate('users');

    if (!post) return res.status(404).send('Post not found');

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;

  const profile = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No profile with id: ${_id}`);

  const updatedProfile = {
    ...profile,
    _id: _id,
    updatedAt: new Date().toISOString(),
  };

  await UserModel.findByIdAndUpdate(_id, updatedProfile, { new: true });

  res.json(updatedProfile);
};
