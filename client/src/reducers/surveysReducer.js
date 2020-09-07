import { FETCH_SURVEYS } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;

    default:
      return state;
  }
};
