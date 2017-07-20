import * as actions from '../src/actions/index.js';
  
describe('actions', () => {
  it('should fetch your profile', () => {
    const profile = {
      id: 2,
      first: 'Shi Hao',
      last: 'Hong',
      display: 'Shi Hao Hong',
      email: 'shihaohong94@gmail.com'
    };

    const expectedAction = {
      type: actions.CREATE_MESSAGE,
      payload: profile
    };

    expect(actions.createMessage(profile)).toEqual(expectedAction);
  });
});