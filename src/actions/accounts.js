import database from '../firebase/firebase';
import selectAccountTotal from '../selectors/account-transactions-total';

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
      if (!snap.val()) {
        dispatch(setAccounts([]));
        return dispatch(
          startAddAccount({
            name: 'Cash'
          })
        );
      }

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

// SET_ACCOUNT_TOTAL
export const setAccountTotal = (id, total = 0) => {
  return {
    type: 'SET_ACCOUNT_TOTAL',
    id,
    total
  };
};

// SET_ACCOUNTS_TOTAL
export const setAccountsTotals = (accountsTotals = []) => {
  return {
    type: 'SET_ACCOUNTS_TOTAL',
    accountsTotals
  };
};

export const startUpdateAccountsTotals = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/transactions`).once('value', snap => {
      const transactions = [];
      snap.forEach(childSnap => {
        transactions.push({ id: childSnap.key, ...childSnap.val() });
      });

      const accounts = getState().accounts;
      const accountsTotals = {};
      accounts.forEach(account => {
        const accountTransactions = transactions.filter(transaction => {
          return (
            (transaction.account && transaction.account.id === account.id) ||
            (transaction.toAccount && transaction.toAccount.id === account.id)
          );
        });

        const total = selectAccountTotal(accountTransactions, account.id);

        accountsTotals[account.id] = {
          name: account.name,
          total
        };
      });

      return database
        .ref(`users/${uid}/accounts`)
        .update(accountsTotals)
        .then(() => dispatch(setAccountsTotals(accountsTotals)));
    });
  };
};
