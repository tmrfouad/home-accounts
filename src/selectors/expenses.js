import moment from 'moment';

// Get visible expenses

export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      return (
        (!text ||
          expense.description.toLowerCase().includes(text.toLowerCase())) &&
        (!startDate || moment(expense.createdAt).isSameOrAfter(startDate)) &&
        (!endDate || moment(expense.createdAt).isSameOrBefore(endDate))
      );
    })
    .sort((a, b) => {
      if (!sortBy) {
        return 0;
      }

      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }

      return 0;
    });
};
