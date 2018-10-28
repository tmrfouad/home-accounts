import React from 'react';
import { connect } from 'react-redux';
import AccountTransactionListItem from './AccountTransactionListItem';
import selectAccountTransactions from '../../selectors/account-transactions';
import BounceSpinner from '../spinners/BounceSpinner';

export const AccountTransactionList = ({ styles, transactions, loading }) => (
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
        <div className="list-item list-item--message">
          <BounceSpinner />
        </div>
      ) : transactions.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No Transactions</span>
        </div>
      ) : (
        transactions.map(transaction => (
          <AccountTransactionListItem key={transaction.id} {...transaction} />
        ))
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    transactions: selectAccountTransactions(
      state.accountTransactions,
      state.accountTransactionFilters
    ),
    styles: state.styles,
    loading: state.accountTransactionsProps.loading
  };
};

export default connect(mapStateToProps)(AccountTransactionList);
