import database from '../firebase/firebase';

// Add_ACCOUNT
export const addAccount = account => ({
  type: 'ADD_ACCOUNT',
  account
});

export const startAddAccount = (accountData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { name = '' } = accountData;

    const account = {
      name
    };

    return database
      .ref(`users/${uid}/accounts`)
      .push(account)
      .then(ref => {
        dispatch(addAccount({ id: ref.key, ...account }));
      })
      .catch(() => {});
  };
};

// REMOVE_ACCOUNT
export const removeAccount = ({ id }) => ({
  type: 'REMOVE_ACCOUNT',
  id
});

export const startRemoveAccount = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/accounts/${id}`)
      .remove()
      .then(() => {
        dispatch(removeAccount({ id }));
      });
  };
};

// EDIT_ACCOUNT
export const editAccount = ({ id } = {}, updates) => ({
  type: 'EDIT_ACCOUNT',
  id,
  updates
});

export const startEditAccount = ({ id } = {}, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/accounts/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editAccount({ id }, updates));
      });
  };
};

// SET_ACCOUNTS
export const setAccounts = accounts => ({
  type: 'SET_ACCOUNTS',
  accounts
});

export const startSetAccounts = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/accounts`).once('value', snap => {
      const accounts = [];
      snap.forEach(childSnap => {
        accounts.push({
          id: childSnap.key,
          ...childSnap.val()
        });
      });
      dispatch(setAccounts(accounts));
    });
  };
};
