import { FETCH_ONE_GROUP, FETCH_GROUPS, CREATE_GROUP } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_ONE_GROUP:
    return action.payload.data;
  case FETCH_GROUPS:
    return _.mapKeys(action.payload.data, 'id');
  case CREATE_GROUP:
    console.log('action:', action.payload);
    return action.payload.data;
  default:
    return state;
  }   
}