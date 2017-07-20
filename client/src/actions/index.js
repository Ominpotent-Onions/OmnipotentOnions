import axios from 'axios';

export const FETCH_PROFILES = 'fetch_profiles';
export const FETCH_PROFILES_GROUPS = 'fetch_profiles_groups';
export const FETCH_GROUPS = 'fetch_groups';
export const FETCH_CHANNELS = 'fetch_channels';
export const FETCH_MESSAGES = 'fetch_messages';
export const CREATE_GROUP = 'create_group';
export const JOIN_GROUP = 'join_group';
export const CREATE_MESSAGE = 'create_message';
export const FETCH_PROFILE = 'fetch_profile';

export const fetchProfiles = function(user) {
  // dummy request
  const request = [
    {
      id: 1,
      first: 'Gideon',
      last: 'Baik',
      display: 'Gideon Baik',
      email: 'fakeemail@fakewebsite.com',
      phone: null,
      created_at: '2017-07-18 14:06:24.25958',
      updated_at: '2017-07-18 14:06:24.25958'
    }
  ];

  return {
    type: FETCH_PROFILES,
    payload: request
  };
};

export const fetchProfilesGroups = function(user) {
  // dummy request
  const request = [
    {
      id: 1,
      profile_id: 1,
      group_id: 1     
    },
    {
      id: 2,
      profile_id: 1,     
      group_id: 3 
    }
  ];

  return {
    type: FETCH_PROFILES_GROUPS,
    payload: request
  };
};

export const fetchGroups = function(user) {
  const request = axios.get(`/profileGroups/${user.id}`);
  return {
    type: FETCH_GROUPS,
    payload: request
  };
};

export let fetchChannels = function(groupId) {
  const request = axios.get(`/channels/${groupId}`);
  return {
    type: FETCH_CHANNELS,
    payload: request
  };
};

export let fetchMessages = function(channelId) {
  // replace with real ajax request
  const request = axios.get(`/messages/${channelId}`);
  return {
    type: FETCH_MESSAGES,
    payload: request
  };
};

export let createGroup = function(group) {
  const name = {};

  return {
    type: CREATE_GROUP,
    payload: name
  };
};

export let joinGroup = function(invite) {
  const joinGroup = {};

  return {
    type: JOIN_GROUP,
    payload: invite
  };
};

export let createMessage = function(message) {
  // replace with real ajax request
  // const request = axios.post(``);
  // axios.post(`/messages/${}`)
  // const request = {};
  // // change this back later
  // return {
  //   type: CREATE_MESSAGE,
  //   payload: message
  // };
};

export let fetchProfile = function(profile) {
  return {
    type: FETCH_PROFILE,
    payload: profile
  };
}; 
