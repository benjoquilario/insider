import * as api from '../api';
import * as ActionTypes from '../constants/ActionTypes';

export const createPost = post => async dispatch => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: ActionTypes.CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async dispatch => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: ActionTypes.UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = id => async dispatch => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: ActionTypes.LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = id => async dispatch => {
  try {
    await api.deletePost(id);

    dispatch({ type: ActionTypes.DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (id, comment) => async dispatch => {
  try {
    const { data } = await api.postComment(id, comment);

    dispatch({ type: ActionTypes.COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
