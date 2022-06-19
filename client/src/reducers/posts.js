import * as ActionType from '../constants/ActionTypes';

const initialState = {
  isLoading: false,
  posts: [],
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CREATE:
      return { ...state, posts: [action.payload, ...state.posts] };
    case ActionType.RESET_POSTS:
      return { ...state, isLoading: true, posts: [] };
    case ActionType.FETCH_ALL:
      return {
        ...state,
        isLoading: false,
        posts: [
          ...state.posts,
          ...action.payload.data.map(post =>
            state.posts.some(postX => postX._id === post._id) ? 0 : post
          ),
        ],
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case ActionType.UPDATE:
    case ActionType.LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case ActionType.DELETE:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      };
    case ActionType.POST_LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default posts;
