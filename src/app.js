import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/confiureStore';
import { login, logout } from './actions/auth';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { startSetAccounts } from './actions/accounts';
import { startSetSubjects } from './actions/subjects';
import {
  startSetTransactions,
  startSetTransTotal
} from './actions/transactions';
import { startSetSettings } from './actions/settings';

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
      // .dispatch(startSetTransactions())
      // .then(() => store.dispatch(startSetTransTotal()))
      .dispatch(startSetTransTotal())
      .then(() => store.dispatch(startSetAccounts()))
      .then(() => store.dispatch(startSetSubjects()))
      .then(() => store.dispatch(startSetSettings()))
      .then(() => renderApp());
  } else {
    store.dispatch(logout());
    renderApp();
  }
});
