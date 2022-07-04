import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModal from '../models/user.js';
import validateSignIn from '../validation/validateSignIn.js';
import validateSignUp from '../validation/validateSignUp.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateSignIn(email, password);

  if (!isValid) return res.status(400).json(errors);

  try {
    const existingUser = await UserModal.findOne({
      email: email.toLowerCase(),
    });

    if (!existingUser)
      return res.status(401).json({ email: `${email} doesn't exist` });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(401).json({ password: 'Invalid Credentials' });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_JWT,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Please enter a correct email and password.!' });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  const { errors, isValid } = validateSignUp(
    email,
    password,
    confirmPassword,
    firstName,
    lastName
  );

  if (!isValid) return res.status(400).json(errors);

  try {
    const existingUser = await UserModal.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser)
      return res.status(401).json({ error: "User already exits'" });

    if (password !== confirmPassword)
      return res
        .status(401)
        .json({ password: 'Password and Confirm Password must match' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_JWT,
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({ result, token });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const autheticatedUser = async (req, res) => {
  try {
    if (!req.userId) return res.json({ message: 'Unanthenticated' });

    const user = await UserModal.findOne({ _id: req.userId }).select(
      '-password'
    );

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};
