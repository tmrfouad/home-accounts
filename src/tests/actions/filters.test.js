import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from '../../actions/filters';
import moment from 'moment';

// setTextFilter
test('generate set text filter action without a text', () => {
  const result = setTextFilter();
  expect(result).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

test('generate set text filter action with a text', () => {
  const text = 'test';
  const result = setTextFilter(text);
  expect(result).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  });
});

// sortByDate
test('generate sort by date action', () => {
  const result = sortByDate();
  expect(result).toEqual({
    type: 'SORT_BY_DATE'
  });
});

// sortByAmount
test('generate sort by amount action', () => {
  const result = sortByAmount();
  expect(result).toEqual({
    type: 'SORT_BY_AMOUNT'
  });
});

// setStartDate
test('generate set start date action', () => {
  const date = moment(0);
  const result = setStartDate(date);
  expect(result).toEqual({
    type: 'SET_START_DATE',
    startDate: { ...date }
  });
});

// setEndDate
test('generate set end date action', () => {
  const date = moment(0);
  const result = setEndDate(date);
  expect(result).toEqual({
    type: 'SET_END_DATE',
    endDate: { ...date }
  });
});
