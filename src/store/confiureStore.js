import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import transactionsReducer from '../reducers/transactions';
import transactionFiltersReducer from '../reducers/transaction-filters';
import authReducer from '../reducers/auth';
import accountsRducer from '../reducers/accounts';
import subjectsRducer from '../reducers/subjects';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      transactions: transactionsReducer,
      transactionFilters: transactionFiltersReducer,
      auth: authReducer,
      accounts: accountsRducer,
      subjects: subjectsRducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
