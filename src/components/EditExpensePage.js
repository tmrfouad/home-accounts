import React from 'react';
import ExpenseForm from './ExpenseForm';
import ConfirmModal from './ConfirmModal';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import { connect } from 'react-redux';

export class EditExpensePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }

  onSubmit = exp => {
    this.props.startEditExpense(this.props.expense.id, exp);
    this.props.history.push('/');
  };

  onRemoveExpense = () => {
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push('/');
  };

  openDialog = () => {
    this.setState(() => ({ isModalOpen: true }));
  };

  closeDialog = () => {
    this.setState(() => ({ isModalOpen: false }));
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">Edit Expense</h2>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            id="expenseForm"
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button
            className="button button--secondary"
            onClick={this.openDialog}
          >
            Remove Expense
          </button>
        </div>
        <ConfirmModal
          id="confirmModal"
          messageTitle="Remove Expense!"
          messageBody="Are you sure you want to remove this item?"
          isOpen={this.state.isModalOpen}
          onModalClose={this.closeDialog}
          onModalOk={this.onRemoveExpense}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, exp) => {
    dispatch(startEditExpense({ id }, exp));
  },
  startRemoveExpense: id => {
    dispatch(startRemoveExpense({ id }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
