import ExpenseDashbourdPage from '../../components/ExpenseDashbourdPage';
import React from 'react';
import { shallow } from 'enzyme';

test('should render the dashboard page correctly', () => {
  const wrapper = shallow(<ExpenseDashbourdPage />);
  expect(wrapper).toMatchSnapshot();
});
