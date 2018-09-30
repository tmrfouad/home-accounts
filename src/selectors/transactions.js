import moment from 'moment';

// Get visible transactions

export default (
  transactions,
  { type, account, toAccount, subject, startDate, endDate, text, sortBy }
) => {
  return transactions
    .filter(transaction => {
      console.log(!!account);
      return (
        (type === -1 || transaction.type === type) &&
        (!account || transaction.account.name.toLowerCase().includes(account.toLowerCase())) &&
        (!toAccount || (transaction.toAccount && transaction.toAccount.name.toLowerCase().includes(toAccount.toLowerCase()))) &&
        (!subject || transaction.subject.name.toLowerCase().includes(subject.toLowerCase())) &&
        (!startDate ||
          moment(transaction.createdAt).isSameOrAfter(startDate)) &&
        (!endDate || moment(transaction.createdAt).isSameOrBefore(endDate)) &&
        (!text || transaction.notes.toLowerCase().includes(text.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (!sortBy) {
        return 0;
      }

      return a[sortBy] < b[sortBy] ? 1 : -1;

      // if (sortBy === 'date') {
      //   return a.createdAt < b.createdAt ? 1 : -1;
      // } else if (sortBy === 'amount') {
      //   return a.amount < b.amount ? 1 : -1;
      // }

      // return 0;
    });
};
