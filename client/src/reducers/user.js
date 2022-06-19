import * as ActionType from '../constants/ActionTypes';

const initialState = {
  loading: false,
  userLoading: false,
  user: { followers: [] },
  searchUser: [],
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_PROFILE:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducers;
