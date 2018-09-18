// TRANS_SET_TYPE_FILTER
export const setTypeFilter = type => ({
  type: 'TRANS_SET_TYPE_FILTER',
  type
});

// TRANS_SET_ACCOUNT_FILTER
export const setAccountFilter = account => ({
  type: 'TRANS_SET_ACCOUNT_FILTER',
  account
});

// TRANS_SET_TO_ACCOUNT_FILTER
export const setToAccountFilter = toAccount => ({
  type: 'TRANS_SET_TO_ACCOUNT_FILTER',
  toAccount
});

// TRANS_SET_SUBJECT_FILTER
export const setSubjectFilter = subject => ({
  type: 'TRANS_SET_SUBJECT_FILTER',
  subject
});

// TRANS_SET_START_DATE
export const setStartDate = startDate => ({
  type: 'TRANS_SET_START_DATE',
  startDate
});

// TRANS_SET_END_DATE
export const setEndDate = endDate => ({ type: 'TRANS_SET_END_DATE', endDate });

// TRANS_SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'TRANS_SET_TEXT_FILTER',
  text
});

// TRANS_SORT_BY
export const sortBy = sortField => ({ type: 'TRANS_SORT_BY_DATE', sortField });
