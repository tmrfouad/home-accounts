import database from '../firebase/firebase';
import TransactionType from '../enums/TransactionType';
import moment from 'moment';

// ADD_TRANSACTION
export const addTransaction = transaction => ({
  type: 'Add_TRANSACTION',
  transaction
});

export const startAddTransaction = (transactionData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      type = TransactionType.Out,
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

    // console.log(JSON.stringify(transaction));

    return database
      .ref(`users/${uid}/transactionsTotal`)
      .once('value', snap => {
        let transactionsTotal = snap.val();
        switch (type) {
          case TransactionType.In:
            transactionsTotal += amount;
            break;
          case TransactionType.Out:
            transactionsTotal -= amount;
            break;
          case TransactionType.Transfer:
            break;
          default:
            break;
        }

        return database
          .ref(`users/${uid}/transactions`)
          .push(transaction)
          .then(ref => {
            database
              .ref(`users/${uid}/transactionsTotal`)
              .set(transactionsTotal);

            dispatch(addTransaction({ id: ref.key, ...transaction }));
            dispatch(setTransTotal(transactionsTotal));
          });
      });
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
      .once('value', transSnap => {
        const transaction = transSnap.val();
        return database
          .ref(`users/${uid}/transactionsTotal`)
          .once('value', snap => {
            let transactionsTotal = snap.val();
            switch (transaction.type) {
              case TransactionType.In:
                transactionsTotal -= transaction.amount;
                break;
              case TransactionType.Out:
                transactionsTotal += transaction.amount;
                break;
              case TransactionType.Transfer:
                break;
              default:
                break;
            }

            return database
              .ref(`users/${uid}/transactions/${id}`)
              .remove()
              .then(() => {
                database
                  .ref(`users/${uid}/transactionsTotal`)
                  .set(transactionsTotal);

                dispatch(removeTransaction({ id }));
                dispatch(setTransTotal(transactionsTotal));
              });
          });
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
      .once('value', transSnap => {
        const transaction = transSnap.val();
        return database
          .ref(`users/${uid}/transactionsTotal`)
          .once('value', snap => {
            let transactionsTotal = snap.val();
            switch (transaction.type) {
              case TransactionType.In:
                switch (updates.type) {
                  case TransactionType.In:
                    transactionsTotal -= transaction.amount;
                    transactionsTotal += updates.amount;
                    break;
                  case TransactionType.Out:
                    transactionsTotal -= transaction.amount;
                    transactionsTotal -= updates.amount;
                    break;
                  case TransactionType.Transfer:
                    transactionsTotal -= transaction.amount;
                    break;
                  default:
                    break;
                }
                break;
              case TransactionType.Out:
                switch (updates.type) {
                  case TransactionType.In:
                    transactionsTotal += transaction.amount;
                    transactionsTotal += updates.amount;
                    break;
                  case TransactionType.Out:
                    transactionsTotal += transaction.amount;
                    transactionsTotal -= updates.amount;
                    break;
                  case TransactionType.Transfer:
                    transactionsTotal += transaction.amount;
                    break;
                  default:
                    break;
                }
                break;
              case TransactionType.Transfer:
                switch (updates.type) {
                  case TransactionType.In:
                    transactionsTotal += updates.amount;
                    break;
                  case TransactionType.Out:
                    transactionsTotal -= updates.amount;
                    break;
                  case TransactionType.Transfer:
                    break;
                  default:
                    break;
                }
                break;
              default:
                break;
            }

            return database
              .ref(`users/${uid}/transactions/${id}`)
              .update(updates)
              .then(() => {
                database
                  .ref(`users/${uid}/transactionsTotal`)
                  .set(transactionsTotal);

                dispatch(editTransaction({ id }, updates));
                dispatch(setTransTotal(transactionsTotal));
              });
          });
      });
  };
};

// SET_TRANSACTIONS
export const setTransactions = transactions => ({
  type: 'SET_TRANSACTIONS',
  transactions
});

const defaultFilters = {
  startDate: moment().startOf('day'),
  endDate: moment().endOf('day')
};

export const startSetTransactions = (filters = defaultFilters) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    let query = database
      .ref(`users/${uid}/transactions`)
      .orderByChild('createdAt');
    query = filters.startDate
      ? query.startAt(filters.startDate.valueOf())
      : query;
    query = filters.endDate ? query.endAt(filters.endDate.valueOf()) : query;

    return query.once('value', snap => {
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

// SET_TRANS_TOTAL
export const setTransTotal = transactionsTotal => {
  return {
    type: 'SET_TRANS_TOTAL',
    transactionsTotal
  };
};

export const startSetTransTotal = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    let query = database.ref(`users/${uid}/transactionsTotal`);

    return query.once('value', snap => {
      const transactionsTotal = snap.val();
      dispatch(setTransTotal(transactionsTotal));
    });
  };
};
