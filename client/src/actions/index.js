import axios from 'axios';

export const FETCH_PROFILES = 'fetch_profiles';
export const FETCH_PROFILE = 'fetch_profile';

export const FETCH_GROUPS = 'fetch_groups';
export const JOIN_GROUP = 'join_group';
export const CREATE_GROUP = 'create_group';

export const FETCH_CHANNELS = 'fetch_channels';
export const CREATE_CHANNEL = 'create_channel';


export const FETCH_MESSAGES = 'fetch_messages';
export const CREATE_MESSAGE = 'create_message';

export const FETCH_PROFILE = 'fetch_profile';
export const FETCH_FRIENDS = 'fetch_friends';

export const FETCH_PENDING_REQUESTS = 'fetch_pending_requests';
export const FETCH_FRIEND_REQUESTS = 'fetch_friend_requests';

export const fetchProfiles = function(user) {
  const request = axios.get(`/profileGroups/${user.id}`);

  return {
    type: FETCH_PROFILES,
    payload: request
  };
};

export let fetchProfile = function(profile) {
  return {
    type: FETCH_PROFILE,
    payload: profile
  };
}; 

/* -----------------------GROUPS ------------------------------------- */
export const fetchGroups = function(user) {
  const request = axios.get(`/profileGroups/${user.id}`);
  return {
    type: FETCH_GROUPS,
    payload: request
  };
};

export let createGroup = function(group, profile, shortID) {
  const request = axios.post(`/groups/createGroup/${group}?id=${profile}&shortID=${shortID}`);
  return {
    type: CREATE_GROUP,
    payload: request
  };
};

export const joinGroup = function(shortid, profile) {
  const request = axios.post(`/profileGroups/joinGroup/${shortid}?id=${profile}`);
  return {
    type: JOIN_GROUP,
    payload: request
  };
};

/* -----------------------CHANNELS ------------------------------------- */

export let fetchChannels = function(groupId) {
  const request = axios.get(`/channels/${groupId}`);
  return {
    type: FETCH_CHANNELS,
    payload: request
  };
};

export let createChannel = function(group) {
  const request = axios.post(`/channels/${group.groupId}?name=${group.channelName}`);
  return {
    type: CREATE_CHANNEL,
    payload: request
  };
}; 

/* -----------------------MESSAGES ------------------------------------- */

export let fetchMessages = function(channelId) {
  // replace with real ajax request
<<<<<<< 0cf24cde282b5e08553201d2f522a84556db07e5
  const request = axios.get(`/messages/${channelId}`);
  return {
    type: FETCH_MESSAGES,
    payload: request
  };
=======
  // const request = axios.get(``);

  // dummy request 
  // const request = [
  //   {
  //     id: 1,
  //     user: 'Shi-Hao',
  //     text: 'Hello friends!'
  //   },
  //   {
  //     id: 2,
  //     user: 'Peter',
  //     text: 'What\'s up!'
  //   },
  //   {
  //     id: 3,
  //     user: 'Dylan',
  //     text: 'I got the app deployed on Digital Ocean!' 
  //   },
  //   {
  //     id: 4,
  //     user: 'Gideon',
  //     text: 'That\'s awesome! Here, have some spam!'  
  //   }
  // ];


  // return {
  //   type: FETCH_MESSAGES, 
  //   payload: request
  // }; 
>>>>>>> message function with socket
};


export let createMessage = function(message) {
  // replace with real ajax request
  const request = axios.post(`/messages/${message.channelId}`);
  // change this back later
  return {
    type: CREATE_MESSAGE,
    payload: message
  };
}; 

/* Friends List Action Creators */

export let fetchFriends = function(profileId) {
  // hard-coded friends
  // var friends = [
  //   {
  //     id: 12,
  //     first: 'John',
  //     last: 'Doe',
  //     display: 'John Doe',
  //     email: 'johndoe@anonymous.com'
  //   },
  //   {
  //     id: 25,
  //     first: 'Janet',
  //     last: 'Doe',
  //     display: 'Janet Doe',
  //     email: 'janetdoe@anonymous.com'
  //   },
  //   {
  //     id: 36,
  //     first: 'Evets',
  //     last: 'Bojs',
  //     display: 'Evets Bojs',
  //     email: 'elppa@elppa.com'
  //   },
  //   {
  //     id: 77,
  //     first: 'Derf',
  //     last: 'Gnudriz',
  //     display: 'Derf Gnudriz',
  //     email: 'hr@$hr.com'
  //   }
  // ];
  let friends = axios.get(`/friendsget/${profileId}`);

  return {
    type: FETCH_FRIENDS,
    payload: friends
  };
};

export let fetchPendingRequests = function(profileId) {
  // var pending = [
  //   {
  //     id: 15,
  //     first: 'Peter',
  //     last: 'Tan',
  //     display: 'Peter Tan',
  //     email: 'pete@anonymous.com'
  //   },
  //   {
  //     id: 126,
  //     first: 'Dylan',
  //     last: 'Mayoral',
  //     display: 'Dylan Mayoral',
  //     email: 'cooldancer@anonymous.com'
  //   }
  // ];
  var pending = axios.get(`/pendingfriends/pending/${profileId}`);

  return {
    type: FETCH_PENDING_REQUESTS,
    payload: pending
  };
};

export let fetchFriendRequests = function(profileId) {
  // var requests = [
  //   {
  //     id: 300,
  //     first: 'Cat',
  //     last: 'Dog',
  //     display: 'Cat Dog',
  //     email: 'cat@dog.com'
  //   },
  //   {
  //     id: 400,
  //     first: 'Antique',
  //     last: 'Healbot',
  //     display: 'Antique Healbot',
  //     email: 'antikill@bot.com'
  //   }
  // ];
  var requests = axios.get(`/pendingfriends/requests/${profileId}`);

  return {
    type: FETCH_FRIEND_REQUESTS,
    payload: requests
  };
};