import * as TYPES from '../constants/ActionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async dispatch => {
  try {
    dispatch({ type: TYPES.AUTH_START_LOADING });

    const { data } = await api.signIn(formData);

    dispatch({ type: TYPES.AUTH, payload: data });
    dispatch({ type: TYPES.AUTH_FINISH_LOADING });
    navigate('/');
  } catch (error) {
    dispatch({ type: TYPES.AUTH_FINISH_LOADING });
    const errors = error.response?.data;
    dispatch({ type: TYPES.ERROR, payload: errors });
  }
};

export const signup = (formData, navigate) => async dispatch => {
  try {
    dispatch({ type: TYPES.AUTH_START_LOADING });

    const { data } = await api.signUp(formData);

    dispatch({ type: TYPES.AUTH, payload: data });
    dispatch({ type: TYPES.AUTH_FINISH_LOADING });
    navigate('/');
  } catch (error) {
    dispatch({ type: TYPES.AUTH_FINISH_LOADING });
    const errors = error.response?.data;
    dispatch({ type: TYPES.ERROR, payload: errors });
  }
};

export const logout = navigate => async dispatch => {
  dispatch({ type: TYPES.LOGOUT });
  navigate('/auth');
};
