import React from 'react';
import TransactionList from './TransactionList';
import TransactionListFilters from './TransactionListFilters';
import TransactionsSummary from './TransactionsSummary';
import { startSetTransactions } from '../../actions/transactions';
import { connect } from 'react-redux';

class TransactionDashbourdPage extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props.startSetTransactions().then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <div>
        <TransactionsSummary />
        <TransactionListFilters />
        <TransactionList loading={this.state.loading} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetTransactions: () => dispatch(startSetTransactions())
});

export default connect(
  undefined,
  mapDispatchToProps
)(TransactionDashbourdPage);
