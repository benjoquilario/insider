import * as TYPES from '../constants/ActionTypes';
import * as api from '../api';

export const getUserWithPost = (id, page, setHasMore) => async dispatch => {
  try {
    dispatch({ type: 'USER_POSTS_LOADING' });

    const request = await api.fetchUserWithPost(id, page);

    if (request.status === 200) {
      const { data, currentPage, numberOfPages } = request.data;
      setHasMore(data.length > 0);
      dispatch({
        type: TYPES.FETCH_ALL,
        payload: { data, currentPage, numberOfPages },
      });
    }
  } catch (error) {
    dispatch({ type: TYPES.ERROR, payload: error });
  }
};

export const getUser = id => async dispatch => {
  try {
    dispatch({ type: TYPES.START_LOADING });

    const requests = await api.fetchUser(id);
    if (requests.status === 200)
      dispatch({ type: TYPES.FETCH_PROFILE, payload: requests.data });
  } catch (error) {
    dispatch({ type: TYPES.ERROR, payload: error });
  }
};

export const getSearchUser = query => async dispatch => {
  try {
    const requests = await api.fetchSearchUser(query);

    dispatch({ type: 'SEARCH_RESULTS', payload: requests.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (id, updateData) => async dispatch => {
  try {
    const requests = await api.updateProfile(id, updateData);

    if (requests.status === 200)
      dispatch({ type: TYPES.UPDATE_PROFILE, payload: requests.data });

    window.location.reload();
  } catch (error) {
    dispatch({ type: TYPES.ERROR, payload: error });
  }
};

export const getAuthenticatedUser = () => async dispatch => {
  try {
    dispatch({ type: TYPES.USER_LOADING });

    const requests = await api.authUser();

    if (requests.status === 200)
      dispatch({ type: TYPES.INSERT_USER, payload: requests.data });
  } catch (error) {
    dispatch({ type: TYPES.ERROR, payload: error });
  }
};

export const getAllUsers = page => async dispatch => {
  try {
    dispatch({ type: TYPES.START_LOADING });

    const requests = await api.fetchAllUsers(page);

    if (requests.status === 200)
      dispatch({
        type: TYPES.FETCH_ALL_PROFILE,
        payload: requests.data,
      });
  } catch (error) {
    dispatch({ type: TYPES.ERROR, payload: error });
    if (error.response?.status === 401) {
      dispatch({ type: TYPES.LOGOUT });
    }
  }
};

export const followUser = id => async dispatch => {
  try {
    const requests = await api.followUser(id);

    if (requests.status === 200)
      dispatch({ type: TYPES.FOLLOW_USER, payload: requests.data });
  } catch (error) {
    dispatch({ type: TYPES.ERROR, payload: error });
  }
};

export const unFollowUser = id => async dispatch => {
  try {
    const requests = await api.unFollowUser(id);

    if (requests.status === 200)
      dispatch({ type: TYPES.FOLLOW_USER, payload: requests.data });
  } catch (error) {
    dispatch({ type: TYPES.ERROR, payload: error });
  }
};

export const getFollowersById = id => async dispatch => {
  try {
    const requests = await api.fetchFollowersById(id);

    if (requests.status === 200)
      dispatch({ type: TYPES.FOLLOWERS_BY_ID, payload: requests.data });
  } catch (error) {
    dispatch({ type: TYPES.ERROR, payload: error });
  }
};

export const getFollowingById = id => async dispatch => {
  try {
    const requests = await api.fetchFollowingById(id);

    if (requests.status === 200)
      dispatch({ type: TYPES.FOLLOWING_BY_ID, payload: requests.data });
  } catch (error) {
    dispatch({ type: TYPES.ERROR, payload: error });
  }
};
