import * as api from '../api';
import * as ActionType from '../constants/ActionTypes';

export const getPosts = (page, navigate, location) => async dispatch => {
  try {
    dispatch({ type: ActionType.LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page);

    dispatch({
      type: ActionType.FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
  } catch (error) {
    console.log(error);
    if (error.response?.status === 401) {
      dispatch({ type: ActionType.LOGOUT });
      navigate('/auth', location.search);
    }
  }
};

export const createPost = post => async dispatch => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: ActionType.CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async dispatch => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: ActionType.UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = id => async dispatch => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: ActionType.LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = id => async dispatch => {
  try {
    await api.deletePost(id);

    dispatch({ type: ActionType.DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
