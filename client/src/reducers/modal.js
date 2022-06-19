import * as ActionTypes from '../constants/ActionTypes';

const initialState = false;

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_MODAL:
      return action.payload;
    default:
      return state;
  }
};
export default modalReducer;
