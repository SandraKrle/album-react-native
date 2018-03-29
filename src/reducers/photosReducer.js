import initialState from './initialState';
import { FETCH_PHOTOS, RECEIVE_PHOTOS } from '../actions/allActions';

export default function photos(state = initialState.photos, action) {
  let newState;

  switch (action.type) {
    case FETCH_PHOTOS:
      console.log('FETCH_PHOTOS Action');
      return action;
    case RECEIVE_PHOTOS:
      newState = action.photos;
      return newState;
    default:
      return state;
  }
}
