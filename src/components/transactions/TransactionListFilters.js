import React from 'react';
import { connect } from 'react-redux';
import {
  setTypeFilter,
  setTextFilter,
  sortBy,
  setStartDate,
  setEndDate
} from '../../actions/transaction-filters';
import { DateRangePicker } from 'react-dates';
import { startSetTransactions } from '../../actions/transactions';

export class TransactionListFilters extends React.Component {
  state = {
    createdAtfocusedInput: null
  };

  onTypeSelectChange = e => {
    const value = +e.target.value;
    this.props.setTypeFilter(value);
  };

  onCreatedAtChange = ({ startDate, endDate }) => {
    this.props.startSetTransactions({ startDate, endDate }).then(() => {
      this.props.setStartDate(startDate);
      this.props.setEndDate(endDate);
    });
  };

  onCreatedAtfocusChange = createdAtfocusedInput => {
    this.setState({ createdAtfocusedInput });
  };

  onTextFilterChange = e => {
    this.props.setTextFilter(e.target.value);
  };

  onSortSelectChange = e => {
    this.props.sortBy(e.target.value);
  };

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
            <input
              type="text"
              placeholder="Filter By Keyword"
              className="text-input"
              value={this.props.filters.text}
              onChange={this.onTextFilterChange}
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
  filters: state.transactionFilters,
  styles: state.styles
});

const mapDispatchToProps = dispatch => ({
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate)),
  setTextFilter: text => dispatch(setTextFilter(text)),
  setTypeFilter: type => dispatch(setTypeFilter(type)),
  sortBy: sortField => dispatch(sortBy(sortField)),
  startSetTransactions: dateFilters =>
    dispatch(startSetTransactions(dateFilters))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionListFilters);
