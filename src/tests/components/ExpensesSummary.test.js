import React from 'react';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import { shallow } from 'enzyme';

test('should render ExpensesSummary correctly', () => {
  const wrapper = shallow(<ExpensesSummary />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with one expense correctly', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expensesTotal={120} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with multible expenses correctly', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={5} expensesTotal={840} />
  );
  expect(wrapper).toMatchSnapshot();
});
