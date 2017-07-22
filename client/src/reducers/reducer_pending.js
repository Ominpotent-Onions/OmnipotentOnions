import { FETCH_PENDING_REQUESTS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_PENDING_REQUESTS:
    return _.mapKeys(action.payload, 'id');
  default:
    return state;
  }
}