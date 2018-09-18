import React from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import { shallow } from 'enzyme';

let isOpen, onModalClose, onModalOk, messageTitle, messageBody, wrapper;
beforeEach(() => {
  isOpen = true;
  onModalClose = jest.fn();
  onModalOk = jest.fn();
  messageTitle = 'Test Message Title';
  messageBody = 'Test message body';
  wrapper = shallow(
    <ConfirmModal
      isOpen={isOpen}
      onModalClose={onModalClose}
      onModalOk={onModalOk}
      messageTitle={messageTitle}
      messageBody={messageBody}
    />
  );
});

test('should render ConfirmModal correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onModalOk on ok button click', () => {
  wrapper
    .find('button')
    .at(0)
    .simulate('click');
  expect(onModalOk).toHaveBeenCalled();
});

test('should handle onModalClose on cancel button click', () => {
  wrapper
    .find('button')
    .at(1)
    .simulate('click');
  expect(onModalClose).toHaveBeenCalled();
});

test('should handle onModalClose when onRequestClose is called', () => {
  wrapper.find('#modal').prop('onRequestClose')();
  expect(onModalClose).toHaveBeenCalled();
});
