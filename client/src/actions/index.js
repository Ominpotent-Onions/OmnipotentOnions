import axios from 'axios';

export const FETCH_PROFILES = 'fetch_profiles';
export const FETCH_GROUPS = 'fetch_groups';
export const FETCH_ONE_GROUP = 'fetch_one_groups';
export const FETCH_CHANNELS = 'fetch_channels';
export const FETCH_MESSAGES = 'fetch_messages';
export const CREATE_GROUP = 'create_group';
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

export const fetchGroups = function(user) {
  const request = axios.get(`/profileGroups/${user.id}`);
  return {
    type: FETCH_GROUPS,
    payload: request
  };
};

export const fetchOneGroup = function(shortid, profile) {
  const request = axios.post(`/profileGroups/fetchOneGroup/${shortid}?id=${profile}`);
  return {
    type: FETCH_ONE_GROUP,
    payload: request
  };
};

export let fetchChannels = function(group) {
  // replace with real ajax request
  // const request = axios.get(``);

  // dummy request
  const request = [
    {
      id: 1,
      name: 'Shi-Hao\'s Smashing Channel'
    },
    {
      id: 2,
      name: 'Dylan\'s Dynamic Channel'
    },
    {
      id: 3,
      name: 'Peter\'s Poetic Channel'
    },
    {
      id: 4,
      name: 'Gideon\'s Gallant Channel'
    }
  ];

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

export let createGroup = function(group, profile, shortID) {
  const request = axios.post(`/groups/createGroup/${group}?id=${profile}&shortID=${shortID}`);
  return {
    type: CREATE_GROUP,
    payload: request
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
