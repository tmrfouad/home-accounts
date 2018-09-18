import accountsReducer from '../../reducers/accounts';
import accounts from '../fixtures/accounts';

test('set default state', () => {
  const state = accountsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('remove account by id', () => {
  const action = {
    type: 'REMOVE_ACCOUNT',
    id: accounts[1].id
  };
  const state = accountsReducer(accounts, action);
  expect(state).toEqual([accounts[0], accounts[2], accounts[3]]);
});

test('do not remove account if id not found', () => {
  const action = {
    type: 'REMOVE_ACCOUNT',
    id: '-1'
  };
  const state = accountsReducer(accounts, action);
  expect(state).toEqual(accounts);
});

test('add account', () => {
  const newAccount = {
    id: '5',
    name: 'Account 5'
  };
  const action = {
    type: 'ADD_ACCOUNT',
    account: newAccount
  };
  const state = accountsReducer(accounts, action);
  expect(state).toEqual([...accounts, newAccount]);
});

test('edit existing account', () => {
  const name = 'Account 2 Edited';
  const action = {
    type: 'EDIT_ACCOUNT',
    id: accounts[1].id,
    updates: { name }
  };
  const state = accountsReducer(accounts, action);
  expect(state[1].name).toBe(name);
});

test('do not edit non existing account', () => {
  const name = 'Account 2 Edited';
  const action = {
    type: 'EDIT_ACCOUNT',
    id: '-1',
    updates: { name }
  };
  const state = accountsReducer(accounts, action);
  expect(state).toEqual(accounts);
});

test('should set accounts', () => {
  const newAccounts = [...accounts, { ...accounts[0], id: '123' }];
  const action = { type: 'SET_ACCOUNTS', accounts: newAccounts };
  const state = accountsReducer(accounts, action);
  expect(state).toEqual(newAccounts);
});
