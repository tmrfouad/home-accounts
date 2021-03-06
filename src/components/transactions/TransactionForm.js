import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { connect } from 'react-redux';
import TransactionType from '../../enums/TransactionType';
import AutoComplete from '../AutoComplete';

export class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    const transaction = props.transaction;
    this.state = {
      type: transaction ? transaction.type : TransactionType.Out,
      account: transaction ? transaction.account : {},
      toAccount: transaction ? transaction.toAccount : {},
      subject: transaction ? transaction.subject : {},
      amount: transaction ? (transaction.amount / 100).toString() : '',
      createdAt: transaction ? moment(transaction.createdAt) : moment(),
      notes: transaction ? transaction.notes : '',
      createdAtFocused: false,
      error: '',
      mode: transaction ? 'edit' : 'add'
    };
  }

  onTypeChange = e => {
    const value = e.target.value;
    const type = +value;
    this.setState(() => ({ type }));
  };

  onATypeChange = value => {
    const type = +value;
    this.setState(() => ({ type }));
  };

  onAccountChange = value => {
    const id = value;
    const account = this.props.accounts.find(acc => acc.id === id);
    this.setState(() => ({ account }));
  };

  onToAccountChange = value => {
    const id = value;
    const toAccount = this.props.accounts.find(acc => acc.id === id);
    this.setState(() => ({ toAccount }));
  };

  onSubjectChange = value => {
    const id = value;
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
      (this.state.type !== TransactionType.Transfer && !this.state.account) ||
      (this.state.type === TransactionType.Transfer &&
        (!this.state.account || !this.state.toAccount)) ||
      !this.state.subject ||
      !this.state.amount
    ) {
      this.setState(() => ({
        error: `Please provide type, account${
          this.state.type === TransactionType.Transfer ? ', to account' : ''
        }, subject and amount.`
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        type: this.state.type,
        account: {
          id: this.state.account.id,
          name: this.state.account.name
        },
        toAccount:
          this.state.type === TransactionType.Transfer
            ? {
                id: this.state.toAccount.id,
                name: this.state.toAccount.name
              }
            : {},
        subject: {
          id: this.state.subject.id,
          name: this.state.subject.name
        },
        amount: parseFloat(this.state.amount) * 100,
        createdAt: this.state.createdAt.valueOf(),
        notes: this.state.notes
      });

      if (this.props.settings.newAfterSave && this.state.mode === 'add') {
        this.setState({
          type: TransactionType.Out,
          account: this.props.defaultAccount,
          toAccount: {
            id: '',
            name: ''
          },
          subject: {
            id: '',
            name: ''
          },
          amount: '',
          createdAt: moment(),
          notes: ''
        });
        const subjectInput = document.getElementById('subject-text');
        subjectInput.focus();
      }
    }
  };

  componentDidMount() {
    if (this.state.mode === 'add') {
      this.setState({ account: this.props.defaultAccount });
    }
  }

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
            -- Type --
          </option>
          <option value="0">In</option>
          <option value="1">Out</option>
          <option value="2">Transfer</option>
        </select>
        <AutoComplete
          id="account"
          source={this.props.accounts}
          displayField="name"
          valueField="id"
          onChange={this.onAccountChange}
          value={this.state.account && this.state.account.id}
          placeholder="Account"
          className="width-100p"
        />
        {this.state.type === TransactionType.Transfer && (
          <AutoComplete
            id="toAccount"
            source={this.props.accounts}
            displayField="name"
            valueField="id"
            onChange={this.onToAccountChange}
            value={this.state.toAccount && this.state.toAccount.id}
            placeholder="To Account"
            className="width-100p"
          />
        )}
        <AutoComplete
          id="subject"
          source={this.props.subjects}
          displayField="name"
          valueField="id"
          onChange={this.onSubjectChange}
          value={this.state.subject && this.state.subject.id}
          placeholder="Subject"
          className="width-100p"
        />
        <input
          type="text"
          className="text-input"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <div className="date-picker--full-width">
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onCreatedAtChange}
            focused={this.state.createdAtFocused}
            onFocusChange={this.onCreatedAtFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
        </div>
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
    transactionTypes,
    defaultAccount: state.accounts.find(
      acc => acc.id === state.settings.defaultAccount
    ),
    settings: state.settings
  };
};

export default connect(mapStateToProps)(TransactionForm);
