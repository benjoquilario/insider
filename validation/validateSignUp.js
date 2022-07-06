import validator from 'validator';
import isEmpty from './isEmpty.js';

const validateSignUp = (
  email,
  password,
  confirmPassword,
  firstName,
  lastName
) => {
  const errors = {};

  firstName = !isEmpty(firstName) ? firstName : '';
  lastName = !isEmpty(lastName) ? lastName : '';
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';
  password = !isEmpty(confirmPassword) ? confirmPassword : '';

  if (!validator.isLength(firstName, { min: 2, max: 30 })) {
    errors.firstName = 'FirstName must be between 2 and 30 chars';
  }

  if (validator.isEmpty(firstName)) {
    errors.firstName = 'FirstName field is required';
  }

  if (!validator.isLength(lastName, { min: 2, max: 30 })) {
    errors.lastName = 'LastName must be between 2 and 30 chars';
  }

  if (validator.isEmpty(lastName)) {
    errors.lastName = 'LastName field is required';
  }

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

  if (!validator.isLength(confirmPassword, { min: 6, max: 30 })) {
    errors.confirmPassword = 'Password must have 6 and 30 chars';
  }

  if (!validator.equals(password, confirmPassword)) {
    errors.confirmPassword = 'Password and Confirm Password must match';
  }

  if (validator.isEmpty(password)) {
    errors.confirmPassword = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSignUp;
