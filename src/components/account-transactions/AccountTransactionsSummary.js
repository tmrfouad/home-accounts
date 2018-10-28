import React from 'react';
import selectTransactions from '../../selectors/account-transactions';
import selectTransactionsTotal from '../../selectors/account-transactions-total';
import { connect } from 'react-redux';
import numeral from 'numeral';

export const AccountTransactionsSummary = ({
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
    </div>
  </div>
);

const mapStateToProps = state => {
  const visibleTransactions = selectTransactions(
    state.accountTransactions,
    state.accountTransactionFilters
  );

  return {
    transactionCount: visibleTransactions.length,
    transactionsTotal: state.accountTransactionsProps.transactionsTotal,
    visibleTransactionsTotal: selectTransactionsTotal(
      visibleTransactions,
      state.accountTransactionFilters.accountId
    ),
    styles: state.styles,
    settings: state.settings
  };
};

export default connect(mapStateToProps)(AccountTransactionsSummary);
