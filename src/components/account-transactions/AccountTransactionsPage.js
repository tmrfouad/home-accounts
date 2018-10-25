import React from 'react';
import AccountTransactionList from './AccountTransactionList';
import AccountTransactionListFilters from './AccountTransactionListFilters';
import AccountTransactionsSummary from './AccountTransactionsSummary';
import { startSetAccTransactions } from '../../actions/account-transactions';
import { connect } from 'react-redux';

class AccountTransactionsPage extends React.Component {
  componentDidMount() {
    this.props.startSetAccTransactions();
  }

  render() {
    return (
      <div>
        <AccountTransactionsSummary />
        <AccountTransactionListFilters />
        <AccountTransactionList />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetAccTransactions: () => dispatch(startSetAccTransactions())
});

export default connect(
  undefined,
  mapDispatchToProps
)(AccountTransactionsPage);
