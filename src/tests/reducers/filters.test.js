import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('set sort by to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('set sort by to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const state = filtersReducer(currentState, { type: 'SORT_BY_DATE' });
  expect(state.sortBy).toBe('date');
});

test('setup text filter', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_TEXT_FILTER',
    text: 'test'
  });
  expect(state.text).toBe('test');
});

test('setup start date filter', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_START_DATE',
    startDate: moment(1000)
  });
  expect(state.startDate).toEqual(moment(1000));
});

test('setup end date filter', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_END_DATE',
    endDate: moment(1000)
  });
  expect(state.endDate).toEqual(moment(1000));
});
