import database from '../firebase/firebase';
import TransactionType from '../enums/TransactionType';

// ADD_TRANSACTION
export const addTransaction = transaction => ({
  type: 'Add_TRANSACTION',
  transaction
});

export const startAddTransaction = (transactionData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      type = TransactionType.out,
      account = {
        id: '',
        name: ''
      },
      toAccount = {
        id: '',
        name: ''
      },
      subject = {
        id: '',
        name: ''
      },
      amount = 0,
      createdAt = 0,
      notes = ''
    } = transactionData;

    const transaction = {
      type,
      account,
      toAccount,
      subject,
      amount,
      createdAt,
      notes
    };

    return database
      .ref(`users/${uid}/transactions`)
      .push(transaction)
      .then(ref => {
        dispatch(addTransaction({ id: ref.key, ...transaction }));
      })
      .catch(() => {});
  };
};

// REMOVE_TRANSACTION
export const removeTransaction = ({ id }) => ({
  type: 'REMOVE_TRANSACTION',
  id
});

export const startRemoveTransaction = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/transactions/${id}`)
      .remove()
      .then(() => {
        dispatch(removeTransaction({ id }));
      });
  };
};

// EDIT_TRANSACTION
export const editTransaction = ({ id } = {}, updates) => ({
  type: 'EDIT_TRANSACTION',
  id,
  updates
});

export const startEditTransaction = ({ id } = {}, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/transactions/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editTransaction({ id }, updates));
      });
  };
};

// SET_TRANSACTIONS
export const setTransactions = transactions => ({
  type: 'SET_TRANSACTIONS',
  transactions
});

export const startSetTransactions = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/transactions`).once('value', snap => {
      const transactions = [];
      snap.forEach(childSnap => {
        transactions.push({
          id: childSnap.key,
          ...childSnap.val()
        });
      });
      dispatch(setTransactions(transactions));
    });
  };
};
