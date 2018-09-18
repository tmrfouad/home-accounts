import React from 'react';
import { shallow } from 'enzyme';
import { defaultFilters, altFilters } from '../fixtures/filters';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount, wrapper;

beforeEach(() => {
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      filters={defaultFilters}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text filter change', () => {
  const value = 'bill';
  wrapper.find('input').simulate('change', { target: { value } });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should handle date sort select change', () => {
  wrapper.setProps({ filters: altFilters });
  const value = 'date';
  wrapper.find('select').simulate('change', { target: { value } });
  expect(sortByDate).toHaveBeenCalled();
});

test('should handle amount sort select change', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', { target: { value } });
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date change', () => {
  const startDate = moment(0);
  const endDate = moment(0).add(3, 'days');
  wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus change', () => {
  const focusedInput = 'startDate';
  wrapper.find(DateRangePicker).prop('onFocusChange')(focusedInput);
  expect(wrapper.state('createdAtfocusedInput')).toBe(focusedInput);
});
