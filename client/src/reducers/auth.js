import * as TYPES from '../constants/ActionTypes';

const initialState = {
  user: null,
  userLoading: false,
  isLoading: false,
  errors: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.INSERT_USER:
      return { ...state, userLoading: false, user: action.payload };
    case TYPES.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
      return { ...state, user: action.payload.result };
    case TYPES.LOGOUT:
      localStorage.removeItem('profile', `${action?.payload?.token}`);
      return { ...state, user: null, loading: false, error: null };
    case TYPES.ERROR:
      return { ...state, userLoading: false, errors: action.payload };
    case TYPES.USER_LOADING:
      return { ...state, userLoading: true, errors: null };
    case TYPES.FINISH_USER_LOADING:
      return { ...state, userLoading: false, errors: null };
    case TYPES.AUTH_START_LOADING:
      return { ...state, isLoading: true, errors: null };
    case TYPES.AUTH_FINISH_LOADING:
      return { ...state, isLoading: false, errors: null };
    case TYPES.CLEAR_ERROR:
      return { ...state, errors: null };
    default:
      return state;
  }
};

export default authReducer;
