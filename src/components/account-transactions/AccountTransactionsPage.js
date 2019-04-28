import React from 'react';
import AccountTransactionList from './AccountTransactionList';
import AccountTransactionListFilters from './AccountTransactionListFilters';
import AccountTransactionsSummary from './AccountTransactionsSummary';
import { connect } from 'react-redux';

class AccountTransactionsPage extends React.Component {
  render() {
    return (
      <div>
        <AccountTransactionsSummary />
        <AccountTransactionListFilters accountId={this.props.accountId} />
        <AccountTransactionList />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  accountId: props.match.params.id
});

export default connect(
  mapStateToProps,
  undefined
)(AccountTransactionsPage);
