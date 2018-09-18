import React from 'react';
import TransactionForm from './TransactionForm';
import ConfirmModal from './../ConfirmModal';
import {
  startEditTransaction,
  startRemoveTransaction
} from '../../actions/transactions';
import { connect } from 'react-redux';

export class EditTransactionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }

  onSubmit = exp => {
    this.props.startEditTransaction(this.props.transaction.id, exp);
    this.props.history.push('/transactions');
  };

  onRemoveTransaction = () => {
    this.props.startRemoveTransaction(this.props.transaction.id);
    this.props.history.push('/transactions');
  };

  openRemoveTransactionDialog = () => {
    this.setState(() => ({ isModalOpen: true }));
  };

  closeRemoveTransactionDialog = () => {
    this.setState(() => ({ isModalOpen: false }));
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">Edit Transaction</h2>
          </div>
        </div>
        <div className="content-container">
          <TransactionForm
            id="transactionForm"
            transaction={this.props.transaction}
            onSubmit={this.onSubmit}
          />
          <button
            className="button button--secondary"
            onClick={this.openRemoveTransactionDialog}
          >
            Remove Transaction
          </button>
        </div>
        <ConfirmModal
          id="confirmModal"
          messageTitle="Remove Transaction!"
          messageBody="Are you sure you want to remove this transaction?"
          isOpen={this.state.isModalOpen}
          onModalClose={this.closeRemoveTransactionDialog}
          onModalOk={this.onRemoveTransaction}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  transaction: state.transactions.find(
    transaction => transaction.id === props.match.params.id
  )
});

const mapDispatchToProps = dispatch => ({
  startEditTransaction: (id, exp) => {
    dispatch(startEditTransaction({ id }, exp));
  },
  startRemoveTransaction: id => {
    dispatch(startRemoveTransaction({ id }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTransactionPage);
