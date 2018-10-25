import React from 'react';
import { connect } from 'react-redux';
import TransactionListItem from './TransactionListItem';
import selectTransactions from '../../selectors/transactions';
import LoadingSpinner from '../LoadingSpinner';

export const TransactionList = ({ styles, transactions, loading }) => (
  <div
    className={
      styles.collapsed
        ? 'content-container content-container--collapsed'
        : 'content-container'
    }
  >
    <div className="list-header">
      <div className="show-for-mobile">Transactions</div>
      <div className="show-for-desktop">Transaction</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {loading ? (
        <LoadingSpinner />
      ) : transactions.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No Transactions</span>
        </div>
      ) : (
        transactions.map(transaction => (
          <TransactionListItem key={transaction.id} {...transaction} />
        ))
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    transactions: selectTransactions(
      state.transactions,
      state.transactionFilters
    ),
    styles: state.styles,
    loading: state.transactionsProps.loading
  };
};

export default connect(mapStateToProps)(TransactionList);
