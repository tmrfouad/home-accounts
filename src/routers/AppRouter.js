import React from 'react';
import { Router, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import ExpenseDashbourdPage from '../components/expenses/ExpenseDashbourdPage';
import TransactionDashbourdPage from '../components/transactions/TransactionDashbourdPage';
import AddTransactionPage from '../components/transactions/AddTransactionPage';
import EditTransactionPage from '../components/transactions/EditTransactionPage';
import AccountsPage from '../components/accounts/AccountsPage';
import AccountForm from '../components/accounts/AccountForm';
import SubjectsPage from '../components/subjects/SubjectsPage';
import SubjectForm from '../components/subjects/SubjectForm';
import AddExpensePage from '../components/expenses/AddExpensePage';
import EditExpensePage from '../components/expenses/EditExpensePage';
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
        <PrivateRoute
          path="/transactions"
          component={TransactionDashbourdPage}
        />
        <PrivateRoute path="/transcreate" component={AddTransactionPage} />
        <PrivateRoute path="/transedit/:id" component={EditTransactionPage} />
        <PrivateRoute path="/accounts" component={AccountsPage} />
        <PrivateRoute path="/accountform/:id" component={AccountForm} />
        <PrivateRoute path="/accountform" component={AccountForm} />
        <PrivateRoute path="/subjects" component={SubjectsPage} />
        <PrivateRoute path="/subjectform/:id" component={SubjectForm} />
        <PrivateRoute path="/subjectform" component={SubjectForm} />
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
