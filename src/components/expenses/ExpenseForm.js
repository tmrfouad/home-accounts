import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { connect } from 'react-redux';

export class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    const expense = props.expense;
    this.state = {
      account: expense
        ? expense.account
        : {
            id: '',
            name: ''
          },
      description: expense ? expense.description : '',
      notes: expense ? expense.notes : '',
      amount: expense ? (expense.amount / 100).toString() : '',
      createdAt: expense ? moment(expense.createdAt) : moment(),
      createdAtFocused: false,
      error: '',
      mode: expense ? 'edit' : 'add'
    };
  }

  onAccountChange = e => {
    const id = e.target.value;
    const account = this.props.accounts.find(acc => acc.id === id);
    this.setState(() => ({ account, description: account.name }));
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNotesChange = e => {
    const notes = e.target.value;
    this.setState(() => ({ notes }));
  };

  onAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onCreatedAtChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onCreatedAtFocusChange = ({ focused: createdAtFocused }) => {
    this.setState(() => ({ createdAtFocused }));
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.account || !this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: 'Please provide account, description and amount.'
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        account: this.state.account,
        description: this.state.description,
        amount: parseFloat(this.state.amount) * 100,
        createdAt: this.state.createdAt.valueOf(),
        notes: this.state.notes
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <select
          className="select"
          autoFocus
          value={this.state.account.id}
          onChange={this.onAccountChange}
        >
          <option value="" disabled>
            -- Select Account --
          </option>
          {this.props.accounts.map(acc => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="text-input"
          placeholder="Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          className="text-input"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onCreatedAtChange}
          focused={this.state.createdAtFocused}
          onFocusChange={this.onCreatedAtFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          className="textarea"
          placeholder="Add a note for your expense (optional)"
          value={this.state.notes}
          onChange={this.onNotesChange}
        />
        <div>
          <button className="button">
            {this.state.mode === 'add' ? 'Add Expense' : 'Edit Expense'}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts
});

export default connect(mapStateToProps)(ExpenseForm);
