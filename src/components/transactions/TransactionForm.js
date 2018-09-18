import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { connect } from 'react-redux';
import TransactionType from '../../enums/TransactionType';

export class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    const transaction = props.transaction;
    this.state = {
      type: transaction ? transaction.type : TransactionType.out,
      account: transaction
        ? transaction.account
        : {
            id: '',
            name: ''
          },
      toAccount: transaction
        ? transaction.toAccount
        : {
            id: '',
            name: ''
          },
      subject: transaction
        ? transaction.subject
        : {
            id: '',
            name: ''
          },
      amount: transaction ? (transaction.amount / 100).toString() : '',
      createdAt: transaction ? moment(transaction.createdAt) : moment(),
      notes: transaction ? transaction.notes : '',
      createdAtFocused: false,
      error: '',
      mode: transaction ? 'edit' : 'add'
    };
  }

  onTypeChange = e => {
    const type = e.target.value;
    this.setState(() => ({ type }));
  };

  onAccountChange = e => {
    const id = e.target.value;
    const account = this.props.accounts.find(acc => acc.id === id);
    this.setState(() => ({ account }));
  };

  onToAccountChange = e => {
    const id = e.target.value;
    const toAccount = this.props.accounts.find(acc => acc.id === id);
    this.setState(() => ({ toAccount }));
  };

  onSubjectChange = e => {
    const id = e.target.value;
    const subject = this.props.subjects.find(sub => sub.id === id);
    this.setState(() => ({ subject }));
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

  onNotesChange = e => {
    const notes = e.target.value;
    this.setState(() => ({ notes }));
  };

  onCreatedAtFocusChange = ({ focused: createdAtFocused }) => {
    this.setState(() => ({ createdAtFocused }));
  };

  onSubmit = e => {
    e.preventDefault();
    if (
      !this.state.type ||
      (this.state.type === TransactionType.transfer &&
        (!this.state.account || !this.state.toAccount)) ||
      (this.state.type !== TransactionType.transfer && !this.state.account) ||
      !this.state.subject ||
      !this.state.amount
    ) {
      this.setState(() => ({
        error: `Please provide type, account${this.state.type ===
          TransactionType.transfer && ', to account'}, subject and amount.`
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        type: this.state.type,
        account: this.state.account,
        toAccount: this.state.toAccount,
        subject: this.state.subject,
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
          value={this.state.type}
          onChange={this.onTypeChange}
        >
          <option value="" disabled>
            -- Select Type --
          </option>
          {this.props.transactionTypes.map(type => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <select
          className="select"
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
        <select
          className="select"
          value={this.state.toAccount.id}
          onChange={this.onToAccountChange}
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
        <select
          className="select"
          value={this.state.subject.id}
          onChange={this.onSubjectChange}
        >
          <option value="" disabled>
            -- Select Subject --
          </option>
          {this.props.subjects.map(sub => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
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
          placeholder="Add a note for your transaction (optional)"
          value={this.state.notes}
          onChange={this.onNotesChange}
        />
        <div>
          <button className="button">
            {this.state.mode === 'add' ? 'Add Transaction' : 'Edit Transaction'}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const transactionTypes = [];
  for (let k in TransactionType) {
    if (TransactionType.hasOwnProperty(k)) {
      const id = TransactionType[k];
      const name = k;
      transactionTypes.push({ id, name });
    }
  }

  return {
    accounts: state.accounts,
    subjects: state.subjects,
    transactionTypes
  };
};

export default connect(mapStateToProps)(TransactionForm);
