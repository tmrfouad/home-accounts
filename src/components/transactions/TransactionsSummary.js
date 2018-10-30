import React from 'react';
import selectTransactions from '../../selectors/transactions';
import selectTransactionsTotal from '../../selectors/transactions-total';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import {
  startSetTransactions,
  startSetTransTotal
} from '../../actions/transactions';
import TransactionType from '../../enums/TransactionType';

export const TransactionsSummary = ({
  styles,
  transactionCount,
  transactionsTotal,
  visibleTransactionsTotal,
  inTransactionsTotal,
  outTransactionsTotal,
  settings,
  filters,
  refreshTransactions
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
        <br />
        <span className="positive">
          {inTransactionsTotal !== 0 &&
            settings.currencySymbol +
              numeral(inTransactionsTotal / 100).format('0,0.00')}
        </span>
        <span className="negative">
          {outTransactionsTotal !== 0 &&
            ' ' +
              settings.currencySymbol +
              numeral((-1 * outTransactionsTotal) / 100).format('0,0.00')}
        </span>
      </h2>
      <h4>
        Net balance:{' '}
        <span>
          {settings.currencySymbol +
            numeral(transactionsTotal / 100).format('0,0.00')}
        </span>
      </h4>
      <div className="page-header__actions d-inline-block">
        <Link className="button" to="/transcreate">
          Add Transaction
        </Link>
      </div>
      <div className="page-header__actions d-inline-block">
        <button
          className="button button--secondary"
          onClick={() =>
            refreshTransactions({
              startDate: filters.startDate,
              endDate: filters.endDate
            })
          }
        >
          <FontAwesomeIcon className="font-awesome-icon" icon={faSyncAlt} />
        </button>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  const visibleTransactions = selectTransactions(
    state.transactions,
    state.transactionFilters
  );

  const inTransactions = visibleTransactions.filter(
    trans => trans.type === TransactionType.In
  );
  const outTransactions = visibleTransactions.filter(
    trans => trans.type === TransactionType.Out
  );

  return {
    transactionCount: visibleTransactions.length,
    transactionsTotal: state.transactionsProps.transactionsTotal,
    visibleTransactionsTotal: selectTransactionsTotal(visibleTransactions),
    inTransactionsTotal: selectTransactionsTotal(inTransactions),
    outTransactionsTotal: selectTransactionsTotal(outTransactions),
    styles: state.styles,
    settings: state.settings,
    filters: state.transactionFilters
  };
};

const mapDispatchToProps = dispatch => ({
  refreshTransactions: dateFilters => {
    dispatch(startSetTransactions(dateFilters));
    dispatch(startSetTransTotal());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsSummary);
