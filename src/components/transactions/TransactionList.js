import React from 'react';
import { connect } from 'react-redux';
import TransactionListItem from './TransactionListItem';
import selectTransactions from '../../selectors/transactions';

export const TransactionList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Transactions</div>
      <div className="show-for-desktop">Transaction</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {props.transactions.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No Transactions</span>
        </div>
      ) : (
        props.transactions.map(transaction => (
          <TransactionListItem key={transaction.id} {...transaction} />
        ))
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    transactions: selectTransactions(state.transactions, state.filters)
  };
};

export default connect(mapStateToProps)(TransactionList);
