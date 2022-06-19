import * as ActionType from '../constants/ActionTypes';
import * as api from '../api';

export const getProfile = id => async dispatch => {
  try {
    dispatch({ type: ActionType.LOADING });

    const { data } = await api.fetchProfile(id);

    dispatch({ type: ActionType.FETCH_PROFILE, payload: { user: data } });
  } catch (error) {
    console.log(error);
  }
};
