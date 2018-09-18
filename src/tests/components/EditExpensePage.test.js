import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper, expense;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      expense={expenses[0]}
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
    />
  );
  expense = {
    account: expenses[0].account,
    description: expenses[0].description,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt,
    notes: expenses[0].notes
  };
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', () => {
  wrapper.find('#expenseForm').prop('onSubmit')(expense);
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expense);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle startRemoveExpense on dialog ok', () => {
  wrapper.find('button').simulate('click');
  wrapper.find('#confirmModal').prop('onModalOk')();
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[0].id);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should not handle startRemoveExpense on dialog cancel', () => {
  wrapper.find('button').simulate('click');
  wrapper.find('#confirmModal').prop('onModalClose')();
  expect(startRemoveExpense).not.toHaveBeenCalled();
  expect(history.push).not.toHaveBeenCalled();
});
