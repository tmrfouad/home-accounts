import React from 'react';
import TransactionList from './TransactionList';
import TransactionListFilters from './TransactionListFilters';
import TransactionsSummary from './TransactionsSummary';
import {
  startSetTransactions,
  setTransLoading
} from '../../actions/transactions';
import { connect } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';

class TransactionDashbourdPage extends React.Component {
  componentDidMount() {
    this.props.setTransLoading(true);
    this.props.startSetTransactions();
  }

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

const mapDispatchToProps = dispatch => ({
  startSetTransactions: () => dispatch(startSetTransactions()),
  setTransLoading: loading => dispatch(setTransLoading(loading))
});

export default connect(
  undefined,
  mapDispatchToProps
)(TransactionDashbourdPage);
