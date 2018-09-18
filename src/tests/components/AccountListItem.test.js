import React from 'react';
import { shallow } from 'enzyme';
import accounts from '../fixtures/accounts';
import AccountListItem from '../../components/accounts/AccountListItem';

test('should render AccountListItem correctly', () => {
  const wrapper = shallow(
    <AccountListItem key={accounts[0].id} {...accounts[0]} />
  );
  expect(wrapper).toMatchSnapshot();
});
