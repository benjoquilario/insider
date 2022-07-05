import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import users from './user';
import modal from './modal';

export const reducers = combineReducers({
  posts,
  auth,
  users,
  modal,
});
