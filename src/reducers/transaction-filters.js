import moment from 'moment';

// Transaction Filters Reducer

const transFiltersReducerDefaultState = {
  type: null,
  account: null,
  toAccount: null,
  subject: null,
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
  text: '',
  sortBy: 'date' // date or amount
};

export default (state = transFiltersReducerDefaultState, action) => {
  switch (action.type) {
    case 'TRANS_SET_TYPE_FILTER':
      return { ...state, type: action.type };
    case 'TRANS_SET_ACCOUNT_FILTER':
      return { ...state, account: action.account };
    case 'TRANS_SET_TO_ACCOUNT_FILTER':
      return { ...state, toAccount: action.toAccount };
    case 'TRANS_SET_SUBJECT_FILTER':
      return { ...state, subject: action.subject };
    case 'TRANS_SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'TRANS_SET_END_DATE':
      return { ...state, endDate: action.endDate };
    case 'TRANS_SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'TRANS_SORT_BY':
      return { ...state, sortBy: action.sortBy };
    default:
      return state;
  }
};