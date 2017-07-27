import { JOIN, UNJOIN, FETCH_ALL_ATTENDEES } from '../actions';
import _ from 'loadash';

export default function(state = {}, action) {
  switch (action.type) {
  case JOIN:
    return;
  case UNJOIN:
    return;
  case FETCH_ALL_ATTENDEES:
    return;
  default:
    return state;
  }
}