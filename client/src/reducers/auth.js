import * as ActionTypes from '../constants/ActionTypes';

const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case ActionTypes.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, user: action?.data };
    case ActionTypes.LOGOUT:
      localStorage.removeItem('profile', `${action?.data?.token}`);
      return { ...state, user: null, loading: false, errors: null };
    case ActionTypes.ERR0R:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.LOADING:
      return { ...state, loading: true, error: null };
    case ActionTypes.LOADING_DONE:
      return { ...state, loading: false, error: null };
    case ActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default authReducer;
