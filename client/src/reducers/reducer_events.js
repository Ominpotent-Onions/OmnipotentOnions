import { CREATE_EVENT, DELETE_EVENT } from '../actions';
import _ from 'loadash';

export default function(state = {}, action) {
  switch (action.type) {
  case CREATE_EVENT:
    return;
  case DELETE_EVENT:
    return;
  default:
    return state;
  }
}