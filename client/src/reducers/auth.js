import * as ActionType from '../constants/ActionTypes';

const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case ActionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, user: action?.data };
    case ActionType.LOGOUT:
      localStorage.removeItem('profile');
      return { ...state, user: null, loading: false, errors: null };
    case ActionType.ERR0R:
      return { ...state, loading: false, error: action.payload };
    case ActionType.LOADING:
      return { ...state, loading: true, error: null };
    case ActionType.LOADING_DONE:
      return { ...state, loading: false, error: null };
    case ActionType.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default authReducer;
