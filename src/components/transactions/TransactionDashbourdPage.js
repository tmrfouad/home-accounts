import React from 'react';
import TransactionList from './TransactionList';
import TransactionListFilters from './TransactionListFilters';
import TransactionsSummary from './TransactionsSummary';

class TransactionDashbourdPage extends React.Component {
  render() {
    return (
      <div>
        <TransactionsSummary />
        <TransactionListFilters />
        <TransactionList />
      </div>
    );
  }
}

export default TransactionDashbourdPage;
