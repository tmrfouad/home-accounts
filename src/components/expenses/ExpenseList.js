import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../../selectors/expenses';

export const ExpenseList = ({ styles, expenses }) => (
  <div
    className={
      styles.collapsed
        ? 'content-container content-container--collapsed'
        : 'content-container'
    }
  >
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No Expenses</span>
        </div>
      ) : (
        expenses.map(expense => (
          <ExpenseListItem key={expense.id} {...expense} />
        ))
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
    styles: state.styles
  };
};

export default connect(mapStateToProps)(ExpenseList);
