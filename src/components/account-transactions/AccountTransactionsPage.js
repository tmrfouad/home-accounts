import React from 'react';
import AccountTransactionList from './AccountTransactionList';
import AccountTransactionListFilters from './AccountTransactionListFilters';
import AccountTransactionsSummary from './AccountTransactionsSummary';

class AccountTransactionsPage extends React.Component {
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

export default AccountTransactionsPage;
