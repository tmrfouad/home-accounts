import moment from 'moment';

// Get visible transactions

export default (
  transactions,
  { typeId, startDate, endDate, accountId, sortBy }
) => {
  return transactions
    .filter(transaction => {
      return (
        (typeId === -1 || transaction.type === typeId) &&
        (!startDate ||
          moment(transaction.createdAt).isSameOrAfter(startDate)) &&
        (!endDate || moment(transaction.createdAt).isSameOrBefore(endDate)) &&
        (accountId &&
          ((transaction.account && transaction.account.id === accountId) ||
            (transaction.toAccount && transaction.toAccount.id === accountId)))
      );
    })
    .sort((a, b) => {
      if (!sortBy) {
        return 0;
      }

      if (sortBy === 'type') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      }

      return a[sortBy] < b[sortBy] ? 1 : -1;
    });
};
