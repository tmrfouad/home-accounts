import React from 'react';
import TransactionForm from './TransactionForm';
import { startAddTransaction } from '../../actions/transactions';
import { connect } from 'react-redux';

export class AddTransactionPage extends React.Component {
  onSubmit = transaction => {
    this.props.startAddTransaction(transaction);
    this.props.history.push('/transactions');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h2 className="page-header__title">Add Transaction</h2>
          </div>
        </div>
        <div className="content-container">
          <TransactionForm id="transactionForm" onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddTransaction: transaction => dispatch(startAddTransaction(transaction))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddTransactionPage);
