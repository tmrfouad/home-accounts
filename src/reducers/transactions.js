// Transactions Reducer

const transactionsReducerDefaultState = [];

export default (state = transactionsReducerDefaultState, action) => {
  switch (action.type) {
    case 'Add_TRANSACTION':
      return [...state, action.transaction];
    case 'REMOVE_TRANSACTION':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_TRANSACTION':
      return state.map(
        transaction =>
          transaction.id === action.id
            ? { ...transaction, ...action.updates }
            : transaction
      );
    case 'SET_TRANSACTIONS':
      return action.transactions;
    default:
      return state;
  }
};
