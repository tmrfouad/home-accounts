import React from 'react';
import { connect } from 'react-redux';
import {
  setTypeFilter,
  setAccountFilter,
  sortBy,
  setStartDate,
  setEndDate
} from '../../actions/account-transaction-filters';
import { DateRangePicker } from 'react-dates';
import { startSetAccTransactions } from '../../actions/account-transactions';
import AutoComplete from '../AutoComplete';

export class AccountTransactionListFilters extends React.Component {
  state = {
    createdAtfocusedInput: null
  };

  onTypeSelectChange = e => {
    const value = +e.target.value;
    this.props.setTypeFilter(value);
  };

  onCreatedAtChange = ({ startDate, endDate }) => {
    this.props.startSetAccTransactions({ startDate, endDate }).then(() => {
      this.props.setStartDate(startDate);
      this.props.setEndDate(endDate);
    });
  };

  onCreatedAtfocusChange = createdAtfocusedInput => {
    this.setState({ createdAtfocusedInput });
  };

  onAccountFilterChange = accountId => {
    this.props.setAccountFilter(accountId);
  };

  onSortSelectChange = e => {
    this.props.sortBy(e.target.value);
  };

  // <input
  //   type="text"
  //   placeholder="Filter By Keyword"
  //   className="text-input"
  //   value={this.props.filters.accountId}
  //   onChange={this.onAccountFilterChange}
  // />

  render() {
    return (
      <div
        className={
          this.props.styles.collapsed
            ? 'content-container content-container--collapsed'
            : 'content-container'
        }
      >
        <div className="input-group">
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.type}
              onChange={this.onTypeSelectChange}
            >
              <option value="-1">All</option>
              <option value="0">In</option>
              <option value="1">Out</option>
              <option value="2">Transfer</option>
            </select>
          </div>
          <div className="input-group__item input-group__item--grow">
            <AutoComplete
              id="defaultAccount"
              source={this.props.accounts}
              displayField="name"
              valueField="id"
              onChange={this.onAccountFilterChange}
              value={this.props.filters.accountId}
              placeholder="Account"
              className="width-100p"
            />
          </div>
          <div className="input-group__item date-picker--full-width-mobile">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              startDateId="your_unique_start_date_id"
              endDate={this.props.filters.endDate}
              endDateId="your_unique_end_date_id"
              onDatesChange={this.onCreatedAtChange}
              focusedInput={this.state.createdAtfocusedInput}
              onFocusChange={this.onCreatedAtfocusChange}
              isOutsideRange={() => false}
              numberOfMonths={1}
              showClearDates={true}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortSelectChange}
            >
              <option value="createdAt">Date</option>
              <option value="amount">Amount</option>
              <option value="type">Type</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts,
  filters: state.accountTransactionFilters,
  styles: state.styles
});

const mapDispatchToProps = dispatch => ({
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate)),
  setAccountFilter: accountId => dispatch(setAccountFilter(accountId)),
  setTypeFilter: type => dispatch(setTypeFilter(type)),
  sortBy: sortField => dispatch(sortBy(sortField)),
  startSetAccTransactions: dateFilters =>
    dispatch(startSetAccTransactions(dateFilters))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountTransactionListFilters);