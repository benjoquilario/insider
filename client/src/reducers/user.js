import * as TYPES from '../constants/ActionTypes';

const initialState = {
  user: {},
  users: [],
  page: 1,
  loading: false,
  userLoading: false,
  searchResults: [],
  followers: [],
  following: [],
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
      return {
        ...state,
        followers: action.payload,
      };
    case TYPES.FOLLOWING_BY_ID:
      return {
        ...state,
        following: action.payload,
      };
    case TYPES.SEARCH_RESULTS:
      return { ...state, searchResults: [...action.payload] };
    case TYPES.START_LOADING:
      return { ...state, loading: true };
    case TYPES.ADD_PAGE:
      return { ...state, page: state.page + 1 };
    case TYPES.SET_PAGE_TO_DEFAULT:
      return { ...state, page: 1 };
    case TYPES.CLEAR_USERS:
      return { ...state, users: [] };
    case TYPES.CLEAR_SEARCH_RESULTS:
      return { ...state, searchResults: [] };
    default:
      return state;
  }
};

export default userReducers;
