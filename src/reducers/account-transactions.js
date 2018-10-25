// Account Transactions Reducer

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_ACC_TRANSACTIONS':
      return action.transactions;
    default:
      return state;
  }
};
