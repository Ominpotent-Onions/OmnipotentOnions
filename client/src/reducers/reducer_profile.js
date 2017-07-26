import { FETCH_PROFILE, UPDATE_PROFILE_BIO, UPDATE_NICKNAME } from '../actions';

export default function(state = {}, action) {
  console.log('action', action.payload);
  console.log('state', state);
  switch (action.type) {
  case FETCH_PROFILE:
    // console.log('profile fetched');
    return action.payload;
  case UPDATE_PROFILE_BIO:
    return action.payload.data;
  case UPDATE_NICKNAME:
    return action.payload.data;
  default:
    // console.log('action default', action);
    // console.log('hit default!! state ', state);
    return state;
  
  }

}