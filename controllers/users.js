import mongoose from 'mongoose';

import PostMessage from '../models/postsMessage.js';
import UserModel from '../models/user.js';

export const getUser = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No user found with id: ${_id}`);

    const user = await UserModel.findById(_id).select('-password');

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};

export const searchUser = async (req, res) => {
  const { q } = req.query;

  try {
    const user = await UserModel.find({ name: { $regex: new RegExp(q) } });

    if (!user) return res.status(404).send('User not found');

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};

export const getUserWithPost = async (req, res) => {
  const { id: _id } = req.params;
  const { page } = req.query;

  try {
    const LIMIT = 2;
    const startIndex = (Number(page) - 1) * LIMIT;

    const posts = await PostMessage.find({ creator: _id })
      .skip(startIndex)
      .limit(LIMIT)
      .sort({ createdAt: -1 })
      .populate('users', '-password')
      .populate('comments.user', '-password');

    if (!posts) return res.status(404).send('Post not found');

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 5;
    const startIndex = (Number(page) - 1) * LIMIT;
    const profiles = await UserModel.find()
      .select('-password')
      .skip(startIndex)
      .limit(LIMIT)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      data: profiles,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const { changePhoto, changeCover } = req.body;

    const user = await UserModel.findById(req.userId);

    if (!user) return res.status(404).send('No user found');

    if (changePhoto) {
      user.imageUrl = changePhoto;

      await user.save();
    }

    if (changeCover) {
      user.coverPhoto = changeCover;

      await user.save();
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};

export const followUser = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id: ${_id}`);

    const user = await UserModel.find({ _id, followers: req.userId });

    if (user.length > 0)
      return res.status(500).json({ message: 'You Followed this user' });

    const newUser = await UserModel.findOneAndUpdate(
      { _id: _id },
      {
        $push: { followers: req.userId },
      },
      { new: true }
    );

    await UserModel.findOneAndUpdate(
      { _id: req.userId },
      {
        $push: { following: _id },
      }
    );

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};

export const unFollowUser = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id: ${_id}`);

    const newUser = await UserModel.findOneAndUpdate(
      { _id: _id },
      {
        $pull: { followers: req.userId },
      },
      { new: true }
    );

    await UserModel.findOneAndUpdate(
      { _id: req.userId },
      {
        $pull: { following: _id },
      }
    );

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};

export const getFollowersById = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const LIMIT = 6;

    const followers = await UserModel.find({ following: _id })
      .limit(LIMIT)
      .sort({ createdAt: -1 })
      .populate('followers', '-password');

    return res.status(200).json(followers);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getFollowingById = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const LIMIT = 6;

    const following = await UserModel.find({ followers: _id })
      .limit(LIMIT)
      .sort({ createdAt: -1 })
      .populate('following', '-password');

    return res.status(200).json(following);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
