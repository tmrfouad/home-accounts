export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_TRANS_TOTAL':
      return {
        transactionsTotal: action.transactionsTotal
      };
    case 'SET_TRANS_LOADING':
      return {
        loading: action.loading
      };
    default:
      return state;
  }
};
