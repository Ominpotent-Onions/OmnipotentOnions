import { FETCH_FRIENDS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_FRIENDS:
    console.log('friend payload', action.payload.data);
    return action.payload.data;
  default:
    return state;
  }
}
