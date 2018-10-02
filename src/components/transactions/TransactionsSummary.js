import React from 'react';
import selectTransactions from '../../selectors/transactions';
import selectTransactionsTotal from '../../selectors/transactions-total';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

export const TransactionsSummary = ({
  styles,
  transactionCount,
  transactionsTotal,
  visibleTransactionsTotal,
  hiddenTransactionsCount
}) => (
  <div className="page-header">
    <div
      className={
        styles.collapsed
          ? 'content-container content-container--collapsed'
          : 'content-container'
      }
    >
      <h2 className="page-header__title">
        Total <span>{transactionCount || 0}</span> transaction
        {transactionCount === 1 ? '' : 's'}
        {': '}
        <span>{numeral(visibleTransactionsTotal / 100).format('$0,0.00')}</span>
      </h2>
      <h4>
        Total balance:{' '}
        <span>{numeral(transactionsTotal / 100).format('$0,0.00')}</span>
      </h4>
      {hiddenTransactionsCount > 0 && (
        <h4 className="show-for-desktop">
          Not showing <span>{hiddenTransactionsCount || 0}</span> transaction
          {hiddenTransactionsCount === 1 ? '' : 's'}
        </h4>
      )}
      <div className="page-header__actions">
        <Link className="button" to="/transcreate">
          Add Transaction
        </Link>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  const visibleTransactions = selectTransactions(
    state.transactions,
    state.transactionFilters
  );
  const hiddenTransactionsCount =
    state.transactions.length - visibleTransactions.length;
  return {
    transactionCount: visibleTransactions.length,
    transactionsTotal: selectTransactionsTotal(state.transactions),
    visibleTransactionsTotal: selectTransactionsTotal(visibleTransactions),
    hiddenTransactionsCount: hiddenTransactionsCount,
    styles: state.styles
  };
};

export default connect(mapStateToProps)(TransactionsSummary);
