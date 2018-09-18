import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseForm } from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import accounts from '../fixtures/accounts';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<ExpenseForm accounts={accounts} />);
});

test('should render expense form correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render expense form with expense data', () => {
  wrapper.setProps({
    expense: expenses[0]
  });
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set account on select change', () => {
  const value = accounts[1].id;
  wrapper.find('select').simulate('change', { target: { value } });
  expect(wrapper.state('account')).toEqual(accounts[1]);
});

test('should set description on account select change', () => {
  const value = accounts[1].id;
  wrapper.find('select').simulate('change', { target: { value } });
  expect(wrapper.state('description')).toBe(accounts[1].name);
});

test('should set description on input change', () => {
  const value = 'Expense 1 desciption';
  wrapper
    .find('input')
    .at(0)
    .simulate('change', { target: { value: value } });
  expect(wrapper.state('description')).toBe(value);
});

test('should set notes on textarea change', () => {
  const value = 'test data';
  wrapper.find('textarea').simulate('change', { target: { value: value } });
  expect(wrapper.state('notes')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '23.50';
  wrapper
    .find('input')
    .at(1)
    .simulate('change', { target: { value: value } });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const value = '12.122';
  wrapper
    .find('input')
    .at(1)
    .simulate('change', { target: { value: value } });
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  wrapper = shallow(
    <ExpenseForm
      accounts={accounts}
      onSubmit={onSubmitSpy}
      expense={expenses[0]}
    />
  );
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    account: expenses[0].account,
    description: expenses[0].description,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt,
    notes: expenses[0].notes
  });
});

test('should set new date on date change', () => {
  const value = moment();
  wrapper.find(SingleDatePicker).prop('onDateChange')(value);
  expect(wrapper.state('createdAt')).toEqual(value);
});

test('should set calendar focus on change', () => {
  const focused = true;
  wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });
  expect(wrapper.state('createdAtFocused')).toBe(focused);
});
