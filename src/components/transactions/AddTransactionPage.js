import React from 'react';
import TransactionForm from './TransactionForm';
import { startAddTransaction } from '../../actions/transactions';
import { connect } from 'react-redux';
import { BackButton } from '../BackButton';

export class AddTransactionPage extends React.Component {
  onSubmit = transaction => {
    this.props.startAddTransaction(transaction);
    this.props.history.push('/transactions');
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
            <h2 className="page-header__title">Add Transaction</h2>
          </div>
        </div>
        <div
          className={
            this.props.styles.collapsed
              ? 'content-container content-container--collapsed'
              : 'content-container'
          }
        >
          <TransactionForm id="transactionForm" onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  styles: state.styles
});

const mapDispatchToProps = dispatch => ({
  startAddTransaction: transaction => dispatch(startAddTransaction(transaction))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTransactionPage);
