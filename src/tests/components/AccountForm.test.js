import React from 'react';
import { shallow } from 'enzyme';
import { AccountForm } from '../../components/AccountForm';
import accounts from '../fixtures/accounts';

let wrapper, startAddAccount, startEditAccount, startRemoveAccount, history;

beforeEach(() => {
  startAddAccount = jest.fn();
  startEditAccount = jest.fn();
  startRemoveAccount = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AccountForm
      startAddAccount={startAddAccount}
      startEditAccount={startEditAccount}
      startRemoveAccount={startRemoveAccount}
      history={history}
      accounts={accounts}
    />
  );
});

test('should render account form correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render account form with expense data', () => {
  wrapper.setProps({
    account: accounts[0]
  });
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set name on input change', () => {
  const value = 'Account 1 name';
  wrapper
    .find('input')
    .at(0)
    .simulate('change', { target: { value: value } });
  expect(wrapper.state('name')).toBe(value);
});

test('should handle startAddExpense', () => {
  expect(wrapper.state('mode')).toBe('add');

  const name = 'New Account';
  wrapper.setState({ name });

  wrapper.find('form').prop('onSubmit')({
    preventDefault: () => {}
  });

  expect(wrapper.state('error')).toBe('');
  expect(startAddAccount).toHaveBeenLastCalledWith({
    name: name
  });
  expect(history.push).toHaveBeenLastCalledWith('/accounts');
});

test('should handle startEditExpense', () => {
  wrapper = shallow(
    <AccountForm
      startEditAccount={startEditAccount}
      history={history}
      accounts={accounts}
      account={accounts[0]}
    />
  );

  expect(wrapper.state('mode')).toBe('edit');

  wrapper.find('form').prop('onSubmit')({
    preventDefault: () => {}
  });

  expect(wrapper.state('error')).toBe('');
  expect(startEditAccount).toHaveBeenLastCalledWith(accounts[0].id, {
    name: accounts[0].name
  });
  expect(history.push).toHaveBeenLastCalledWith('/accounts');
});

test('should handle startRemoveExpense', () => {
  wrapper = shallow(
    <AccountForm
      startRemoveAccount={startRemoveAccount}
      history={history}
      accounts={accounts}
      account={accounts[0]}
    />
  );

  expect(wrapper.state('mode')).toBe('edit');

  wrapper
    .find('button')
    .at(1)
    .prop('onClick')({
    preventDefault: () => {}
  });

  wrapper.find('#confirmModal').prop('onModalOk')();

  expect(wrapper.state('error')).toBe('');
  expect(startRemoveAccount).toHaveBeenLastCalledWith(accounts[0].id);
  expect(history.push).toHaveBeenLastCalledWith('/accounts');
});
