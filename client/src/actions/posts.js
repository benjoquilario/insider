import * as api from '../api';
import * as TYPES from '../constants/ActionTypes';

export const getPosts = (page, navigate, setHasMore) => async dispatch => {
  try {
    const requests = await api.fetchPosts(page);

    if (requests.status === 200) {
      const { data, currentPage, numberOfPages } = requests.data;
      setHasMore(data.length > 0);

      dispatch({
        type: TYPES.FETCH_ALL,
        payload: { data, currentPage, numberOfPages },
      });
    }
  } catch (error) {
    dispatch({ type: TYPES.ERROR, payload: error });
    if (error.response?.status === 401) {
      dispatch({ type: TYPES.LOGOUT });
      navigate('/auth');
    }
  }
};

export const createPost = post => async dispatch => {
  try {
    const requests = await api.createPost(post);

    if (requests.status === 201)
      dispatch({ type: TYPES.CREATE, payload: requests.data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async dispatch => {
  try {
    const requests = await api.updatePost(id, post);

    if (requests.status === 200)
      dispatch({ type: TYPES.UPDATE, payload: requests.data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = id => async dispatch => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const requests = await api.likePost(id, user?.token);

    if (requests.status === 200)
      dispatch({ type: TYPES.LIKE, payload: requests.data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = id => async dispatch => {
  try {
    await api.deletePost(id);

    dispatch({ type: TYPES.DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (id, comment) => async dispatch => {
  try {
    dispatch({ type: TYPES.COMMENT_START_LOADING });

    const requests = await api.postComment(id, comment);

    dispatch({ type: TYPES.COMMENT_END_LOADING });

    if (requests.status === 200)
      dispatch({ type: TYPES.CREATE_COMMENT, payload: requests.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = (id, comment) => async dispatch => {
  try {
    const requests = await api.updateComment(id, comment);

    dispatch({ type: TYPES.UPDATE_COMMENT, payload: requests.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = id => async dispatch => {
  try {
    const requests = await api.deleteComment(id);

    dispatch({ type: TYPES.DELETE_COMMENT, payload: requests.data });
  } catch (error) {
    console.log(error);
  }
};
