import * as ActionTypes from '../constants/ActionTypes';
import * as api from '../api';

export const signin = (formData, navigate, location) => async dispatch => {
  try {
    dispatch({ type: ActionTypes.LOADING });

    const { data } = await api.signIn(formData);

    dispatch({ type: ActionTypes.LOADING_DONE });
    dispatch({ type: ActionTypes.AUTH, data });
    navigate('/', location.search);
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate, location) => async dispatch => {
  try {
    dispatch({ type: ActionTypes.LOADING });

    const { data } = await api.signUp(formData);

    dispatch({ type: ActionTypes.LOADING_DONE });
    dispatch({ type: ActionTypes.AUTH, data });
    navigate('/', location.search);
  } catch (error) {
    const errors = error.response?.data.errors;
    dispatch({ type: ActionTypes.ERR0R, payload: errors });
  }
};

export const logout = (navigate, location) => async dispatch => {
  dispatch({ type: ActionTypes.LOGOUT });
  navigate('/auth', location.search);
};
