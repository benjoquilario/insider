import validator from 'validator';
import isEmpty from './isEmpty.js';

const validateSignIn = (email, password) => {
  const errors = {};

  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (!validator.isEmail(email)) {
    errors.email = 'Email is Invalid';
  }

  if (validator.isEmpty(email)) {
    errors.email = 'Email is Required';
  }

  if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must have 6 and 30 chars';
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSignIn;
