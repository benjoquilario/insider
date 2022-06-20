import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  isLoading: false,
  posts: [],
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE:
      return { ...state, posts: [action.payload, ...state.posts] };
    case ActionTypes.RESET_POSTS:
      return { ...state, isLoading: true, posts: [] };
    case ActionTypes.FETCH_ALL:
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
    case ActionTypes.UPDATE:
    case ActionTypes.LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case ActionTypes.DELETE:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      };
    case ActionTypes.POST_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id
            ? { ...post, comments: action.payload.comments }
            : post
        ),
      };
    default:
      return state;
  }
};

export default posts;
