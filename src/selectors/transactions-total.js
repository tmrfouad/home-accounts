import TransactionTypes from '../enums/TransactionType'

export default transactions =>
  transactions
    .map(transaction => {
      switch (transaction.type) {
        case TransactionTypes.In:
          return transaction.amount;
        case TransactionTypes.Out:
          return transaction.amount * -1;
        default:
          return 0;
      }
    })
    .reduce((sum, amount) => sum + amount, 0);
