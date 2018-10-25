// ACC_TRANS_SET_TYPE_FILTER
export const setTypeFilter = typeId => ({
  type: 'ACC_TRANS_SET_TYPE_FILTER',
  typeId
});

// ACC_TRANS_SET_START_DATE
export const setStartDate = startDate => ({
  type: 'ACC_TRANS_SET_START_DATE',
  startDate
});

// ACC_TRANS_SET_END_DATE
export const setEndDate = endDate => ({
  type: 'ACC_TRANS_SET_END_DATE',
  endDate
});

// ACC_TRANS_SET_ACCOUNT_FILTER
export const setAccountFilter = (accountId = '') => {
  return {
    type: 'ACC_TRANS_SET_ACCOUNT_FILTER',
    accountId
  };
};

// ACC_TRANS_SORT_BY
export const sortBy = sortBy => ({ type: 'ACC_TRANS_SORT_BY', sortBy });
