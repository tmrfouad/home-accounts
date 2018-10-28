import database from '../firebase/firebase';
import moment from 'moment';

// SET_ACC_TRANSACTIONS
export const setAccTransactions = transactions => ({
  type: 'SET_ACC_TRANSACTIONS',
  transactions
});

const defaultFilters = {
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export const startSetAccTransactions = (filters = defaultFilters) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    let query = database
      .ref(`users/${uid}/transactions`)
      .orderByChild('createdAt');

    query = filters.startDate
      ? query.startAt(filters.startDate.valueOf())
      : query;
    query = filters.endDate ? query.endAt(filters.endDate.valueOf()) : query;

    dispatch(setAccTransLoading(true));
    return query.once('value', snap => {
      let transactions = [];
      snap.forEach(childSnap => {
        transactions.push({
          id: childSnap.key,
          ...childSnap.val()
        });
      });

      dispatch(setAccTransactions(transactions));
      dispatch(setAccTransLoading(false));
    });
  };
};

// SET_ACC_TRANS_TOTAL
export const setAccTransTotal = transactionsTotal => {
  return {
    type: 'SET_ACC_TRANS_TOTAL',
    transactionsTotal
  };
};

export const startSetAccTransTotal = accountId => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    let query = database.ref(`users/${uid}/accounts/${accountId}/total`);

    return query.once('value', snap => {
      const transactionsTotal = snap.val();
      dispatch(setAccTransTotal(transactionsTotal));
    });
  };
};

// SET_ACC_TRANS_LOADING
export const setAccTransLoading = loading => {
  return {
    type: 'SET_ACC_TRANS_LOADING',
    loading
  };
};
