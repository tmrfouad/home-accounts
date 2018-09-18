import React from 'react';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

export const ExpensesSummary = ({
  expenseCount,
  expensesTotal,
  hiddenExpensesCount
}) => (
  <div className="page-header">
    <div className="content-container">
      <h2 className="page-header__title">
        Viewing <span>{expenseCount || 0}</span> expense
        {expenseCount === 1 ? '' : 's'} totalling{' '}
        <span>{numeral(expensesTotal / 100).format('$0,0.00')}</span>
      </h2>
      {hiddenExpensesCount > 0 && (
        <h4>
          Not showing <span>{hiddenExpensesCount || 0}</span> expense
          {hiddenExpensesCount === 1 ? '' : 's'}
        </h4>
      )}
      <div className="page-header__actions">
        <Link className="button" to="/create">
          Add Expense
        </Link>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  const hiddenExpensesCount = state.expenses.length - visibleExpenses.length;
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses),
    hiddenExpensesCount: hiddenExpensesCount
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
