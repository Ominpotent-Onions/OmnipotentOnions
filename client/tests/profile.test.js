import React from 'react';
import Profile from '../src/components/profile';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Profile />).toJSON();
  expect(tree).toMatchSnapshot();
});