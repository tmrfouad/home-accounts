// Accounts Reducer

const accountsReducerDefaultState = [];

export default (state = accountsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return [...state, action.account];
    case 'REMOVE_ACCOUNT':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_ACCOUNT':
      return state.map(
        account =>
          account.id === action.id ? { ...account, ...action.updates } : account
      );
    case 'SET_ACCOUNTS':
      return action.accounts;
    case 'SET_ACCOUNT_TOTAL':
      return state.map(
        account =>
          account.id === action.id
            ? { ...account, total: action.total }
            : account
      );
    case 'SET_ACCOUNTS_TOTAL':
      return state.map(account => {
        const accountTotal = action.accountsTotals[account.id];
        return { ...account, total: accountTotal };
      });
    default:
      return state;
  }
};
