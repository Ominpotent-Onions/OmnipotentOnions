'use strict'

import React from 'react';
import MessageBoard from '../src/components/messages_board';
import renderer from 'react-test-renderer';

const messages = [
  {
    id: 1,
    user: 'Shi-Hao',
    text: 'Hello friends!'
  },
  {
    id: 2,
    user: 'Peter',
    text: 'What\'s up!'
  },
  {
    id: 3,
    user: 'Dylan',
    text: 'I got the app deployed on Digital Ocean!' 
  },
  {
    id: 4,
    user: 'Gideon',
    text: 'That\'s awesome! Here, have some spam!'  
  }
];

it('renders correctly', () => {
  const tree = renderer.create(<MessageBoard 
    messages={messages}
  />).toJSON();
  expect(tree).toMatchSnapshot();
})