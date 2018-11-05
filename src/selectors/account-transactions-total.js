import TransactionTypes from '../enums/TransactionType';

const selectTransactionsTotal = (transactions, accountId) => {
  if (!transactions || !accountId) {
    return 0;
  }

  return transactions
    .map(transaction => {
      switch (transaction.type) {
        case TransactionTypes.In:
          return transaction.amount;
        case TransactionTypes.Out:
          return transaction.amount * -1;
        case TransactionTypes.Transfer:
          if (transaction.account.id === accountId) {
            return transaction.amount * -1;
          } else if (transaction.toAccount.id === accountId) {
            return transaction.amount;
          } else {
            return 0;
          }
        default:
          return 0;
      }
    })
    .reduce((sum, amount) => sum + amount, 0);
};

const selectInTransactionsTotal = (transactions, accountId) => {
  if (!transactions || !accountId) {
    return 0;
  }

  return transactions
    .map(transaction => {
      switch (transaction.type) {
        case TransactionTypes.In:
          return transaction.amount;
        case TransactionTypes.Transfer:
          if (transaction.toAccount.id === accountId) {
            return transaction.amount;
          } else {
            return 0;
          }
        default:
          return 0;
      }
    })
    .reduce((sum, amount) => sum + amount, 0);
};

const selectOutTransactionsTotal = (transactions, accountId) => {
  if (!transactions || !accountId) {
    return 0;
  }

  return transactions
    .map(transaction => {
      switch (transaction.type) {
        case TransactionTypes.Out:
          return transaction.amount;
        case TransactionTypes.Transfer:
          if (transaction.account.id === accountId) {
            return transaction.amount;
          } else {
            return 0;
          }
        default:
          return 0;
      }
    })
    .reduce((sum, amount) => sum + amount, 0);
};

export {
  selectInTransactionsTotal,
  selectOutTransactionsTotal,
  selectTransactionsTotal as default
};
