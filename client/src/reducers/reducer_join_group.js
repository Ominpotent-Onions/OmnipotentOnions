import { FETCH_PROFILES_GROUPS, JOIN_GROUP } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case JOIN_GROUP:
    // var newObj = Object.assign({}, state);
    // console.log('before obj:',action.payload);
    // newObj[action.payload.id] = action.payload;
    // console.log('after obj:',newObj);    
    // return newObj;
    return null;
  case FETCH_PROFILES_GROUPS:
    return _.mapKeys(action.payload, 'id');
  default:
    return state;
  }   
}