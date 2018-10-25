import moment from 'moment';

// Get visible transactions

export default (transactions, { typeId, startDate, endDate, text, sortBy }) => {
  return transactions
    .filter(transaction => {
      return (
        (typeId === -1 || transaction.type === typeId) &&
        (!startDate ||
          moment(transaction.createdAt).isSameOrAfter(startDate)) &&
        (!endDate || moment(transaction.createdAt).isSameOrBefore(endDate)) &&
        (!text ||
          (transaction.account.name
            .toLowerCase()
            .includes(text.toLowerCase()) ||
            (transaction.toAccount &&
              transaction.toAccount.name
                .toLowerCase()
                .includes(text.toLowerCase())) ||
            transaction.subject.name
              .toLowerCase()
              .includes(text.toLowerCase()) ||
            transaction.notes.toLowerCase().includes(text.toLowerCase())))
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
