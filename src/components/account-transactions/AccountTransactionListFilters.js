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
import {
  startSetAccTransactions,
  startSetAccTransTotal
} from '../../actions/account-transactions';
import AutoComplete from '../AutoComplete';
import moment from 'moment';

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
    this.props.startSetAccTransTotal(accountId);
  };

  onSortSelectChange = e => {
    this.props.sortBy(e.target.value);
  };

  componentDidMount() {
    this.props.startSetAccTransactions().then(() => {
      const accountId =
        this.props.accountId ||
        this.props.filters.accountId ||
        this.props.defaultAccountId;

      let startDate;
      let endDate;
      if (this.props.monthStart) {
        startDate = moment()
          .subtract(this.props.monthStart <= 15 ? 0 : 1, 'month')
          .startOf('month')
          .add(this.props.monthStart - 1, 'day');
        endDate = moment(startDate).add(1, 'month');
      }

      if (accountId) {
        this.props.setAccountFilter(accountId);
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
        this.props.startSetAccTransTotal(accountId);
      }
    });
  }

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
              id="accountId"
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
              minimumNights={0}
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
  filters: state.accTransFilters,
  styles: state.styles,
  defaultAccountId: state.settings.defaultAccount,
  monthStart: state.settings.monthStart
});

const mapDispatchToProps = dispatch => ({
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate)),
  setAccountFilter: accountId => dispatch(setAccountFilter(accountId)),
  setTypeFilter: type => dispatch(setTypeFilter(type)),
  sortBy: sortField => dispatch(sortBy(sortField)),
  startSetAccTransactions: dateFilters =>
    dispatch(startSetAccTransactions(dateFilters)),
  startSetAccTransTotal: accountId => dispatch(startSetAccTransTotal(accountId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountTransactionListFilters);
