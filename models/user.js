import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      maxlength: 25,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
    imageUrl: {
      type: String,
    },
    coverPhoto: {
      type: String,
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
