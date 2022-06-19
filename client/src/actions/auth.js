import * as ActionType from '../constants/ActionTypes';
import * as api from '../api';

export const signin = (formData, navigate, location) => async dispatch => {
  try {
    dispatch({ type: ActionType.LOADING });

    const { data } = await api.signIn(formData);

    dispatch({ type: ActionType.LOADING_DONE });
    dispatch({ type: ActionType.AUTH, data });
    navigate('/', location.search);
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate, location) => async dispatch => {
  try {
    dispatch({ type: ActionType.LOADING });

    const { data } = await api.signUp(formData);

    dispatch({ type: ActionType.LOADING_DONE });
    dispatch({ type: ActionType.AUTH, data });
    navigate('/', location.search);
  } catch (error) {
    const errors = error.response?.data.errors;
    dispatch({ type: ActionType.ERR0R, payload: errors });
  }
};
