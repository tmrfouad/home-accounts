import React from 'react';
import selectTransactions from '../selectors/transactions';
import selectTransactionsTotal from '../selectors/transactions-total';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

export const TransactionsSummary = ({
  transactionCount,
  transactionsTotal,
  hiddenTransactionsCount
}) => (
  <div className="page-header">
    <div className="content-container">
      <h2 className="page-header__title">
        Viewing <span>{transactionCount || 0}</span> transaction
        {transactionCount === 1 ? '' : 's'} totalling{' '}
        <span>{numeral(transactionsTotal / 100).format('$0,0.00')}</span>
      </h2>
      {hiddenTransactionsCount > 0 && (
        <h4>
          Not showing <span>{hiddenTransactionsCount || 0}</span> transaction
          {hiddenTransactionsCount === 1 ? '' : 's'}
        </h4>
      )}
      <div className="page-header__actions">
        <Link className="button" to="/create">
          Add Transaction
        </Link>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  const visibleTransactions = selectTransactions(
    state.transactions,
    state.filters
  );
  const hiddenTransactionsCount =
    state.transactions.length - visibleTransactions.length;
  return {
    transactionCount: visibleTransactions.length,
    transactionsTotal: selectTransactionsTotal(visibleTransactions),
    hiddenTransactionsCount: hiddenTransactionsCount
  };
};

export default connect(mapStateToProps)(TransactionsSummary);
