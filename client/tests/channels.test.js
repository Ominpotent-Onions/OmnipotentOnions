import React from 'react';
import { Channels } from '../src/containers/channels'
import renderer from 'react-test-renderer';
import _ from 'lodash';

const fetchChannels = function(group) {
  return;
}

const channels = [
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


it('renders correctly', () => {
  const tree = renderer.create(<Channels 
    fetchChannels={fetchChannels}
    channels={channels}
  />);

  expect(tree).toMatchSnapshot();
})