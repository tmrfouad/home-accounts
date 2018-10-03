export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_TRANS_TOTAL':
      return {
        transactionsSums: { transactionsTotal: action.transactionsTotal }
      };
    default:
      return state;
  }
};
