export default transactions =>
  transactions
    .map(transaction => transaction.amount)
    .reduce((sum, amount) => sum + amount, 0);
