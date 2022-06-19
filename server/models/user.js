import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
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
    default:
      'https://apsec.iafor.org/wp-content/uploads/sites/37/2017/02/IAFOR-Black-Avatar-Image.jpg',
  },
  coverPhoto: {
    type: String,
  },
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
  id: {
    type: String,
  },
});

export default mongoose.model('User', userSchema);
