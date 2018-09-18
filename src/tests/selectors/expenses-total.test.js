import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
  const sum = selectExpensesTotal([]);
  expect(sum).toBe(0);
});

test('should correctly add up a single expense', () => {
  const sum = selectExpensesTotal([expenses[0]]);
  expect(sum).toBe(30000);
});

test('should correctly add up multible expenses', () => {
  const sum = selectExpensesTotal(expenses);
  expect(sum).toBe(100000);
});
