import React from 'react';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../../actions/expenses';
import { connect } from 'react-redux';
import { BackButton } from '../BackButton';

export class AddExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div
            className={
              this.props.styles.collapsed
                ? 'content-container content-container--collapsed'
                : 'content-container'
            }
          >
            <BackButton />
            <h2 className="page-header__title">Add Expense</h2>
          </div>
        </div>
        <div
          className={
            this.props.styles.collapsed
              ? 'content-container content-container--collapsed'
              : 'content-container'
          }
        >
          <ExpenseForm id="expenseForm" onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  styles: state.styles
});

const mapDispatchToProps = dispatch => ({
  startAddExpense: expense => dispatch(startAddExpense(expense))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExpensePage);
