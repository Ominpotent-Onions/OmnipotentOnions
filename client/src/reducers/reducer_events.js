import { FETCH_EVENTS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_EVENTS:
    console.log('actions', _.mapKeys(action.payload, 'id'));
    return _.mapKeys(action.payload, 'id');
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