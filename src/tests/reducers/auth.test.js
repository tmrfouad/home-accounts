import authReducer from '../../reducers/auth';

test('should set uid on login', () => {
  const uid = '123Test';
  const action = {
    type: 'LOGIN',
    uid
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe(uid);
});

test('should clear uid on logout', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({ uid: '123Test' }, action);
  expect(state.uid).toBeFalsy();
});
