import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginPage startLogin={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLoginWithGoogle on button click', () => {
  const startLoginWithGoogle = jest.fn();
  const wrapper = shallow(
    <LoginPage startLoginWithGoogle={startLoginWithGoogle} />
  );
  wrapper
    .find('button')
    .at(0)
    .simulate('click');
  expect(startLoginWithGoogle).toHaveBeenCalled();
});

test('should call startLoginWithGithub on button click', () => {
  const startLoginWithGithub = jest.fn();
  const wrapper = shallow(
    <LoginPage startLoginWithGithub={startLoginWithGithub} />
  );
  wrapper
    .find('button')
    .at(1)
    .simulate('click');
  expect(startLoginWithGithub).toHaveBeenCalled();
});
