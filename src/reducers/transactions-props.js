export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_TRANS_TOTAL':
      return {
        ...state,
        transactionsTotal: action.transactionsTotal
      };
    case 'SET_TRANS_LOADING':
      return {
        ...state,
        loading: action.loading
      };
    default:
      return state;
  }
};
