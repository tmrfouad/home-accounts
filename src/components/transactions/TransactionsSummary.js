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
  settings
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
        <span
          className={
            visibleTransactionsTotal === 0
              ? ''
              : visibleTransactionsTotal > 0
                ? 'positive'
                : 'negative'
          }
        >
          {settings.currencySymbol +
            numeral(
              ((visibleTransactionsTotal >= 0 ? 1 : -1) *
                visibleTransactionsTotal) /
                100
            ).format('0,0.00')}
        </span>
      </h2>
      <h4>
        Net balance:{' '}
        <span>
          {settings.currencySymbol +
            numeral(transactionsTotal / 100).format('0,0.00')}
        </span>
      </h4>
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

  return {
    transactionCount: visibleTransactions.length,
    transactionsTotal: state.transactionsSums.transactionsTotal,
    visibleTransactionsTotal: selectTransactionsTotal(visibleTransactions),
    styles: state.styles,
    settings: state.settings
  };
};

export default connect(mapStateToProps)(TransactionsSummary);
