import * as TYPES from '../constants/ActionTypes';

const initialState = {
  loading: false,
  userLoading: false,
  user: {},
  searchUser: [],
  users: [],
  followers: [],
  page: 1,
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_PROFILE:
      return { ...state, loading: false, user: action.payload };
    case TYPES.FETCH_ALL_PROFILE:
      return {
        ...state,
        loading: false,
        users: [...state.users, ...action.payload.data.map(user => user)],
      };
    case TYPES.UPDATE_PROFILE:
      return { ...state, user: action.payload };
    case TYPES.FOLLOW_USER:
      return {
        ...state,
        user: { ...state.user, followers: action.payload.followers },
      };
    case TYPES.FOLLOWERS_BY_ID:
      console.log(action.payload);
      return {
        ...state,
        followers: action.payload,
      };
    case TYPES.START_LOADING:
      return { ...state, loading: true };
    case TYPES.ADD_PAGE:
      return { ...state, page: state.page + 1 };
    case TYPES.SET_PAGE_TO_DEFAULT:
      return { ...state, page: 1 };
    case TYPES.CLEAR_USERS:
      return { ...state, users: [] };
    default:
      return state;
  }
};

export default userReducers;
