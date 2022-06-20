import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  name: String,
  message: String,
  creator: String,
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      _id: { type: String, require: true },
      user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      comment: { type: String, require: true },
      createdAt: { type: Date, default: new Date() },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const postMessage = mongoose.model('PostMessage', postSchema);

export default postMessage;
