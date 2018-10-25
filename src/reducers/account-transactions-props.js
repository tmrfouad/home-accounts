export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACC_TRANS_TOTAL':
      return {
        transactionsTotal: action.transactionsTotal
      };
    case 'SET_ACC_TRANS_LOADING':
      return {
        loading: action.loading
      };
    default:
      return state;
  }
};
