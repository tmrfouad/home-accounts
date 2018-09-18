import React from 'react';
import { Router, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import ExpenseDashbourdPage from '../components/ExpenseDashbourdPage';
import AccountsPage from '../components/AccountsPage';
import AccountForm from '../components/AccountForm';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import PublicRoute from './PublicRoute';
import NotFoundPage from '../components/NotFoundPage';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashbourdPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <PrivateRoute path="/accounts" component={AccountsPage} />
        <PrivateRoute path="/accountform/:id" component={AccountForm} />
        <PrivateRoute path="/accountform" component={AccountForm} />
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
