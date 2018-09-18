import React from 'react';
import { shallow } from 'enzyme';
import AccountsPage from '../../components/accounts/AccountsPage';

test('should render AccountsPage correctly', () => {
  const wrapper = shallow(<AccountsPage />);
  expect(wrapper).toMatchSnapshot();
});
