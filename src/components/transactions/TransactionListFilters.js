import React from 'react';
import { connect } from 'react-redux';
import {
  setTextFilter,
  setAccountFilter,
  sortBy,
  setStartDate,
  setEndDate
} from '../../actions/transaction-filters';
import { DateRangePicker } from 'react-dates';

export class TransactionListFilters extends React.Component {
  state = {
    createdAtfocusedInput: null
  };

  onCreatedAtChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onCreatedAtfocusChange = createdAtfocusedInput => {
    this.setState({ createdAtfocusedInput });
  };

  onAccountFilterChange = e => {
    this.props.setAccountFilter(e.target.value);
  };

  onTextFilterChange = e => {
    this.props.setTextFilter(e.target.value);
  };

  onSortSelectChange = e => {
    this.props.sortBy(e.target.value);
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item--sm">
            <input
              type="text"
              placeholder="Account"
              className="text-input"
              value={this.props.filters.account}
              onChange={this.onAccountFilterChange}
            />
          </div>
          <div className="input-group__item--sm">
            <input
              type="text"
              placeholder="Notes"
              className="text-input"
              value={this.props.filters.text}
              onChange={this.onTextFilterChange}
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
            </select>
          </div>
          <div className="input-group__item">
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.transactionFilters
});

const mapDispatchToProps = dispatch => ({
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate)),
  setTextFilter: text => dispatch(setTextFilter(text)),
  setAccountFilter: accountName => dispatch(setAccountFilter(accountName)),
  sortBy: sortField => dispatch(sortBy(sortField))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionListFilters);
