import moment from 'moment';

// Transaction Filters Reducer

const defaultState = {
  typeId: -1,
  accountId: '',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
  sortBy: 'createdAt'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ACC_TRANS_SET_TYPE_FILTER':
      return { ...state, typeId: action.typeId };
    case 'ACC_TRANS_SET_ACCOUNT_FILTER':
      return { ...state, accountId: action.accountId };
    case 'ACC_TRANS_SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'ACC_TRANS_SET_END_DATE':
      return { ...state, endDate: action.endDate };
    case 'ACC_TRANS_SORT_BY':
      return { ...state, sortBy: action.sortBy };
    default:
      return state;
  }
};
