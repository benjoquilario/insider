import * as ActionTypes from '../constants/ActionTypes';
import * as api from '../api';

export const getProfile = id => async dispatch => {
  try {
    dispatch({ type: ActionTypes.LOADING });

    const { data } = await api.fetchProfile(id);

    dispatch({ type: ActionTypes.FETCH_PROFILE, payload: { user: data } });
  } catch (error) {
    console.log(error);
  }
};
