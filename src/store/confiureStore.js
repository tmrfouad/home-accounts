import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import transactionsReducer from '../reducers/transactions';
import transactionFiltersReducer from '../reducers/transaction-filters';
import authReducer from '../reducers/auth';
import accountsRducer from '../reducers/accounts';
import subjectsRducer from '../reducers/subjects';
import stylesReducer from '../reducers/styles';
import transactionsPropsReducer from '../reducers/transactions-props';
import accountTransactionsReducer from '../reducers/account-transactions';
import accountTransactionsPropsReducer from '../reducers/account-transactions-props';
import accountTransactionFiltersReducer from '../reducers/account-transaction-filters';
import settingsReducer from '../reducers/settings';

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
      subjects: subjectsRducer,
      styles: stylesReducer,
      transactionsProps: transactionsPropsReducer,
      accountTransactions: accountTransactionsReducer,
      accountTransactionFilters: accountTransactionFiltersReducer,
      accountTransactionsProps: accountTransactionsPropsReducer,
      settings: settingsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
