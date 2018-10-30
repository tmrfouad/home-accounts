import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import {
  startSetAccTransactions,
  startSetAccTransTotal
} from '../../actions/account-transactions';

export const AccountTransactionsSummary = ({
  styles,
  transactionsTotal,
  settings,
  account,
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
        {(account ? account.name : 'Account') + ' Ledger'}
      </h2>
      <h4>
        Balance:{' '}
        <span>
          {settings.currencySymbol +
            numeral(transactionsTotal / 100).format('0,0.00')}
        </span>
      </h4>
      <div className="page-header__actions d-inline-block">
        <button
          className="button button--secondary"
          onClick={() => refreshTransactions(filters)}
        >
          <FontAwesomeIcon className="font-awesome-icon" icon={faSyncAlt} />
        </button>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    transactionsTotal: state.accTransProps.transactionsTotal,
    styles: state.styles,
    settings: state.settings,
    filters: state.accTransFilters,
    account: state.accounts.find(
      acc => acc.id === state.accTransFilters.accountId
    )
  };
};

const mapDispatchToProps = dispatch => ({
  refreshTransactions: filters => {
    dispatch(
      startSetAccTransactions({
        startDate: filters.startDate,
        endDate: filters.endDate
      })
    );
    dispatch(startSetAccTransTotal(filters.accountId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountTransactionsSummary);
