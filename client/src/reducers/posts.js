import * as TYPES from '../constants/ActionTypes';

const initialState = {
  posts: [],
  currentPostId: 0,
  currentCommentId: 0,
  page: 1,
  postPage: 1,
  isLoading: false,
  commentLoading: false,
  userPostsLoading: false,
  error: null,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CREATE:
      return { ...state, posts: [action.payload, ...state.posts] };
    case TYPES.RESET_POSTS:
      return { ...state, isLoading: true, posts: [] };
    case TYPES.FETCH_ALL:
      return {
        ...state,
        isLoading: false,
        userPostsLoading: false,
        posts: [
          ...state.posts,
          ...action.payload.data.map(post =>
            state.posts.some(postX => postX._id === post._id) ? 0 : post
          ),
        ],
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case TYPES.UPDATE:
    case TYPES.LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case TYPES.DELETE:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      };
    case TYPES.POST_LOADING:
      return { ...state, isLoading: true };
    case TYPES.POST_END_LOADING:
      return { ...state, isLoading: false };
    case TYPES.COMMENT:
      return {
        ...state,
        commentLoading: false,
        posts: state.posts.map(post =>
          post._id === action.payload._id
            ? { ...post, comments: action.payload.comments }
            : post
        ),
      };
    case TYPES.CREATE_COMMENT:
    case TYPES.UPDATE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id
            ? { ...post, comments: action.payload.comments }
            : post
        ),
      };
    case TYPES.DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id
            ? {
                ...post,
                comments: action.payload.comments,
              }
            : post
        ),
      };
    case TYPES.CURRENT_POST_ID:
      return { ...state, currentPostId: action.payload };
    case TYPES.CURRENT_COMMENT_ID:
      return { ...state, currentCommentId: action.payload };
    case TYPES.ADD_POST_PAGE:
      return { ...state, page: state.page + 1 };
    case TYPES.USER_POSTS_PAGE:
      return { ...state, postPage: state.postPage + 1 };
    case TYPES.USER_POST_DEFAULT_PAGE:
      return { ...state, postPage: 1 };
    case TYPES.PAGE_DEFAULT_NUMBER:
      return { ...state, page: 1 };
    case TYPES.START_LOADING:
      return { ...state, commentLoading: true };
    case TYPES.COMMENT_END_LOADING:
      return { ...state, commentLoading: false };
    case TYPES.USER_POSTS_LOADING:
      return { ...state, userPostsLoading: true };
    case TYPES.ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default posts;
