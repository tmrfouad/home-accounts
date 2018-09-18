import {
  addAccount,
  startAddAccount,
  editAccount,
  startEditAccount,
  removeAccount,
  startRemoveAccount,
  setAccounts,
  startSetAccounts
} from '../../actions/accounts';
import database from '../../firebase/firebase';
import accounts from '../fixtures/accounts';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

//#region prepair pre test data
const createMockStore = configureMockStore([thunk]);
const uid = '123456abcde';
const defaultAuthState = { auth: { uid } };

beforeEach(done => {
  const accountsData = {};
  accounts.forEach(({ id, name }) => {
    accountsData[id] = {
      name
    };
  });

  database
    .ref(`users/${uid}/accounts`)
    .set(accountsData)
    .then(() => {
      done();
    });
});
//#endregion

//#region add account
test('should generate addAccount action correctly', () => {
  const account = accounts[0];
  const action = addAccount(account);
  expect(action).toEqual({
    type: 'ADD_ACCOUNT',
    account
  });
});

test('should add account to database with provided values', done => {
  const store = createMockStore(defaultAuthState);
  const newAccount = {
    name: 'Expense 5'
  };
  store
    .dispatch(startAddAccount(newAccount))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_ACCOUNT',
        account: {
          id: expect.any(String),
          ...newAccount
        }
      });

      return database
        .ref(`users/${uid}/accounts/${actions[0].account.id}`)
        .once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(newAccount);
      done();
    });
});
//#endregion

//#region edit account
test('should generate editAccount action correctly', () => {
  const updates = { name: 'Expense 1 Edited' };
  const id = accounts[0].id;
  const action = editAccount({ id }, updates);
  expect(action).toEqual({
    type: 'EDIT_ACCOUNT',
    id,
    updates
  });
});

test('should modify exspenseType in database', done => {
  const store = createMockStore(defaultAuthState);
  const id = accounts[1].id;
  const name = 'Expense 2 Edited';
  const updates = { name };
  store
    .dispatch(startEditAccount({ id }, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_ACCOUNT',
        id,
        updates
      });

      return database.ref(`users/${uid}/accounts/${id}/name`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBe(name);
      done();
    });
});
//#endregion

//#region remove account
test('should generate removeAccount action correctly', () => {
  const id = accounts[0].id;
  const action = removeAccount({ id });
  expect(action).toEqual({
    type: 'REMOVE_ACCOUNT',
    id
  });
});

test('should remove account from database', done => {
  const store = createMockStore(defaultAuthState);
  const id = accounts[2].id;
  store
    .dispatch(startRemoveAccount({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_ACCOUNT',
        id
      });

      return database.ref(`users/${uid}/accounts/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});
//#endregion

//#region set account
test('should generate setAccounts action correctly', () => {
  const action = setAccounts(accounts);
  expect(action).toEqual({
    type: 'SET_ACCOUNTS',
    accounts
  });
});

test('should fetch accounts from database', done => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetAccounts()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_ACCOUNTS',
      accounts
    });

    done();
  });
});
//#endregion
