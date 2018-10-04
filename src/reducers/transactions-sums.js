export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_TRANS_TOTAL':
      return {
        transactionsTotal: action.transactionsTotal
      };
    default:
      return state;
  }
};
