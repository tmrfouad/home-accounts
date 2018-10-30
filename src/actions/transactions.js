import database from '../firebase/firebase';
import TransactionType from '../enums/TransactionType';
import moment from 'moment';
import selectTransactionsTotal from '../selectors/transactions-total';
import { setAccountTotal } from './accounts';

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
      .ref(`users/${uid}/transactions`)
      .push(transaction)
      .then(ref => {
        dispatch(updateBalance('add', transaction));
        dispatch(addTransaction({ id: ref.key, ...transaction }));
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

    // get removed transaction
    return database
      .ref(`users/${uid}/transactions/${id}`)
      .once('value', transSnap => {
        const transaction = transSnap.val();

        return database
          .ref(`users/${uid}/transactions/${id}`)
          .remove()
          .then(() => {
            dispatch(updateBalance('remove', transaction));
            dispatch(removeTransaction({ id }));
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
          .ref(`users/${uid}/transactions/${id}`)
          .update(updates)
          .then(() => {
            dispatch(updateBalance('edit', transaction, updates));
            dispatch(editTransaction({ id }, updates));
          });
      });
  };
};

// update the totals of all transactions or any accounts related to the transaction
const updateBalance = (operation, transaction, newTransaction) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { type, account, toAccount, amount } = transaction;

    // get all transactions total
    database.ref(`users/${uid}/transactionsTotal`).once('value', snap => {
      let transactionsTotal = snap.val();

      // process total with current transaction
      if (operation === 'edit') {
        transactionsTotal = processTransactionsTotal(
          operation,
          transactionsTotal,
          transaction,
          newTransaction
        );
      } else {
        transactionsTotal = processTransactionsTotal(
          operation,
          transactionsTotal,
          transaction
        );
      }
      // update the total in the database
      database
        .ref(`users/${uid}/transactionsTotal`)
        .set(transactionsTotal)
        .then(() => {
          dispatch(setTransTotal(transactionsTotal));
        });
    });

    // account
    if (operation !== 'edit') {
      // get account total
      database
        .ref(`users/${uid}/accounts/${account.id}/total`)
        .once('value', snap => {
          let accountTotal = snap.val();

          // process total with current transaction
          accountTotal = processAccountTotal(
            operation,
            accountTotal,
            transaction
          );

          // update the total in the database
          database
            .ref(`users/${uid}/accounts/${account.id}/total`)
            .set(accountTotal)
            .then(() => {
              dispatch(setAccountTotal(account.id, accountTotal));
            });
        });
    } else {
      // get old account total
      database
        .ref(`users/${uid}/accounts/${account.id}/total`)
        .once('value', snap => {
          let accountTotal = snap.val();

          // process total with current transaction
          accountTotal = processAccountTotal(
            'remove',
            accountTotal,
            transaction
          );

          // update the total in the database
          database
            .ref(`users/${uid}/accounts/${account.id}/total`)
            .set(accountTotal)
            .then(() => {
              dispatch(setAccountTotal(account.id, accountTotal));

              // get new account total
              const { account: newAccount } = newTransaction;
              database
                .ref(`users/${uid}/accounts/${newAccount.id}/total`)
                .once('value', snap => {
                  let accountTotal = snap.val();

                  // process total with current transaction
                  accountTotal = processAccountTotal(
                    'add',
                    accountTotal,
                    newTransaction
                  );

                  // update the total in the database
                  database
                    .ref(`users/${uid}/accounts/${newAccount.id}/total`)
                    .set(accountTotal)
                    .then(() => {
                      dispatch(setAccountTotal(newAccount.id, accountTotal));
                    });
                });
            });
        });
    }

    // toAccount
    if (operation !== 'edit') {
      // if transaction type is transfer get the total of the account transfered to.
      if (type === TransactionType.Transfer) {
        database
          .ref(`users/${uid}/accounts/${toAccount.id}/total`)
          .once('value', snap => {
            let accountTotal = snap.val();

            // process total with current transaction
            accountTotal = processAccountTotal(
              operation,
              accountTotal,
              transaction,
              true
            );

            // update the total in the database
            database
              .ref(`users/${uid}/accounts/${toAccount.id}/total`)
              .set(accountTotal)
              .then(() => {
                dispatch(setAccountTotal(toAccount.id, accountTotal));
              });
          });
      }
    } else {
      // if transaction type is transfer get the total of the old account transfered to.
      if (type === TransactionType.Transfer) {
        database
          .ref(`users/${uid}/accounts/${toAccount.id}/total`)
          .once('value', snap => {
            let accountTotal = snap.val();

            // process total with current transaction
            accountTotal = processAccountTotal(
              'remove',
              accountTotal,
              transaction,
              true
            );

            // update the total in the database
            database
              .ref(`users/${uid}/accounts/${toAccount.id}/total`)
              .set(accountTotal)
              .then(() => {
                dispatch(setAccountTotal(toAccount.id, accountTotal));

                // if updated transaction type is transfer get the total of the new account transfered to.
                const {
                  type: newType,
                  toAccount: newToAccount
                } = newTransaction;
                if (newType === TransactionType.Transfer) {
                  database
                    .ref(`users/${uid}/accounts/${newToAccount.id}/total`)
                    .once('value', snap => {
                      let accountTotal = snap.val();

                      // process total with current transaction
                      accountTotal = processAccountTotal(
                        'add',
                        accountTotal,
                        newTransaction,
                        true
                      );

                      // update the total in the database
                      database
                        .ref(`users/${uid}/accounts/${newToAccount.id}/total`)
                        .set(accountTotal)
                        .then(() => {
                          dispatch(
                            setAccountTotal(newToAccount.id, accountTotal)
                          );
                        });
                    });
                }
              });
          });
      } else {
        // if updated transaction type is transfer get the total of the new account transfered to.
        const { type: newType, toAccount: newToAccount } = newTransaction;
        if (newType === TransactionType.Transfer) {
          database
            .ref(`users/${uid}/accounts/${newToAccount.id}/total`)
            .once('value', snap => {
              let accountTotal = snap.val();

              // process total with current transaction
              accountTotal = processAccountTotal(
                'add',
                accountTotal,
                newTransaction,
                true
              );

              // update the total in the database
              database
                .ref(`users/${uid}/accounts/${newToAccount.id}/total`)
                .set(accountTotal)
                .then(() => {
                  dispatch(setAccountTotal(newToAccount.id, accountTotal));
                });
            });
        }
      }
    }
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
  // console.log(filters.startDate);
  // console.log(filters.endDate);
  // console.log(filters.startDate.startOf('day'));
  // console.log(filters.endDate.endOf('day'));
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    let query = database
      .ref(`users/${uid}/transactions`)
      .orderByChild('createdAt');
    query = filters.startDate
      ? query.startAt(filters.startDate.startOf('day').valueOf())
      : query;
    query = filters.endDate
      ? query.endAt(filters.endDate.endOf('day').valueOf())
      : query;

    dispatch(setTransLoading(true));
    return query.once('value', snap => {
      const transactions = [];
      snap.forEach(childSnap => {
        transactions.push({
          id: childSnap.key,
          ...childSnap.val()
        });
      });

      dispatch(setTransactions(transactions));
      dispatch(setTransLoading(false));
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

export const startUpdateTransTotal = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/transactions`).once('value', snap => {
      const transactions = [];
      snap.forEach(childSnap => {
        transactions.push({ id: childSnap.key, ...childSnap.val() });
      });

      const transactionsTotal = selectTransactionsTotal(transactions);

      return database
        .ref(`users/${uid}/transactionsTotal`)
        .set(transactionsTotal)
        .then(() => {
          dispatch(setTransTotal(transactionsTotal));
        });
    });
  };
};

// SET_TRANS_LOADING
export const setTransLoading = loading => {
  return {
    type: 'SET_TRANS_LOADING',
    loading
  };
};

// ---------------- helper methods -------------------

function processTransactionsTotal(
  operation,
  total,
  transaction,
  newTransaction
) {
  let result = total;
  const { type, amount } = transaction;
  const { type: newType, amount: newAmount } = newTransaction || {};

  switch (operation) {
    case 'add':
      switch (type) {
        case TransactionType.In:
          result += amount;
          break;
        case TransactionType.Out:
          result -= amount;
          break;
        case TransactionType.Transfer:
          break;
        default:
          break;
      }
      break;
    case 'remove':
      switch (type) {
        case TransactionType.In:
          result -= amount;
          break;
        case TransactionType.Out:
          result += amount;
          break;
        case TransactionType.Transfer:
          break;
        default:
          break;
      }
      break;
    case 'edit':
      switch (type) {
        case TransactionType.In:
          switch (newType) {
            case TransactionType.In:
              result -= amount;
              result += newAmount;
              break;
            case TransactionType.Out:
              result -= amount;
              result -= newAmount;
              break;
            case TransactionType.Transfer:
              result -= amount;
              break;
            default:
              break;
          }
          break;
        case TransactionType.Out:
          switch (newType) {
            case TransactionType.In:
              result += amount;
              result += newAmount;
              break;
            case TransactionType.Out:
              result += amount;
              result -= newAmount;
              break;
            case TransactionType.Transfer:
              result += amount;
              break;
            default:
              break;
          }
          break;
        case TransactionType.Transfer:
          switch (newType) {
            case TransactionType.In:
              result += newAmount;
              break;
            case TransactionType.Out:
              result -= newAmount;
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
      break;
    default:
      break;
  }

  return result;
}

function processAccountTotal(operation, total, transaction, transTo) {
  let result = total;
  const { type, amount } = transaction;

  switch (operation) {
    case 'add':
      if (!transTo) {
        switch (type) {
          case TransactionType.In:
            result += amount;
            break;
          case TransactionType.Out:
          case TransactionType.Transfer:
            result -= amount;
            break;
          default:
            break;
        }
      } else {
        result += amount;
      }
      break;
    case 'remove':
      if (!transTo) {
        switch (type) {
          case TransactionType.In:
            result -= amount;
            break;
          case TransactionType.Out:
          case TransactionType.Transfer:
            result += amount;
            break;
          default:
            break;
        }
      } else {
        result -= amount;
      }
      break;
    default:
      break;
  }

  return result;
}
