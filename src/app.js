import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/confiureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { startSetAccounts } from './actions/accounts';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store
      .dispatch(startSetExpenses())
      .then(() => {
        return store.dispatch(startSetAccounts());
      })
      .then(() => {
        renderApp();
      });
  } else {
    store.dispatch(logout());
    renderApp();
  }
});
