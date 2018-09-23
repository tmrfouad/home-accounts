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
      type: transaction ? transaction.type : TransactionType.Out,
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

  autocomplete(inp, src, displayField, valueField, onChange) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    const valInp = inp.parentElement.querySelector("input[type='hidden']");
    let currentFocus;

    inp.addEventListener('click', showList);

    inp.addEventListener('blur', function(e) {
      let inputValue = this.value;
      const foundObj = src.find(
        o => o[displayField].toUpperCase() === inputValue.toUpperCase()
      );
      if (foundObj) {
        inp.value = foundObj[displayField];
        valInp.value = foundObj[valueField];
        closeAllLists();
        onChange({ target: valInp });
      }
    });

    /*execute a function when someone writes in the text field:*/
    inp.addEventListener('input', function(e) {
      showList(e.target);
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener('keydown', function(e) {
      let x = document.getElementById(this.id + 'autocomplete-list');
      if (x) x = x.getElementsByTagName('div');
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) {
        //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
    function showList() {
      let a,
        b,
        i,
        inputValue = inp.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!inputValue) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement('DIV');
      a.setAttribute('id', inp.id + 'autocomplete-list');
      a.setAttribute('class', 'autocomplete-items');
      /*append the DIV element as a child of the autocomplete container:*/
      inp.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < src.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        const srcObj = src[i];
        const srcValue = srcObj[valueField];
        const srcDisplay = srcObj[displayField];
        if (srcDisplay.toUpperCase().includes(inputValue.toUpperCase())) {
          /*create a DIV element for each matching element:*/
          b = document.createElement('DIV');
          /*make the matching letters bold:*/
          const valIndex = srcDisplay
            .toUpperCase()
            .indexOf(inputValue.toUpperCase());
          b.innerHTML = srcDisplay.substr(0, valIndex);
          b.innerHTML +=
            '<strong>' +
            srcDisplay.substr(valIndex, inputValue.length) +
            '</strong>';
          b.innerHTML += srcDisplay.substr(valIndex + inputValue.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + srcDisplay + "'>";
          b.innerHTML += "<input type='hidden' value='" + srcValue + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener('click', function(e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = b.getElementsByTagName('input')[0].value;
            valInp.value = b.getElementsByTagName('input')[1].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
            onChange({ target: valInp });
          });
          a.appendChild(b);
        }
      }
    }
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add('autocomplete-active');
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove('autocomplete-active');
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      let x = document.getElementsByClassName('autocomplete-items');
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener('click', function(e) {
      closeAllLists(e.target);
    });
  }

  onTypeChange = e => {
    const type = +e.target.value;
    this.setState(() => ({ type }));
  };

  onAccountInputChange = e => {
    const id = e.target.value;
    const account = this.props.accounts.find(acc => acc.id === id);
    this.setState(() => ({ account }));
  };

  onAccountChange = e => {
    // const id = e.target.value;
    // const account = this.props.accounts.find(acc => acc.id === id);
    // this.setState(() => ({ account }));
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
        account: this.state.account,
        toAccount: this.state.toAccount,
        subject: this.state.subject,
        amount: parseFloat(this.state.amount) * 100,
        createdAt: this.state.createdAt.valueOf(),
        notes: this.state.notes
      });
    }
  };

  componentDidMount() {
    this.autocomplete(
      document.getElementById('AccountInput'),
      this.props.accounts,
      'name',
      'id',
      this.onAccountInputChange
    );
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
          {this.props.transactionTypes.map(type => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <div className="autocomplete">
          <input
            id="AccountInput"
            type="text"
            className="text-input width-100p"
            placeholder="Account"
          />
          <input type="hidden" />
        </div>
        <select
          className="select"
          value={this.state.account.id}
          onChange={this.onAccountChange}
        >
          <option value="" disabled>
            -- {this.state.type === TransactionType.Transfer ? 'From ' : ''}
            Account --
          </option>
          {this.props.accounts.map(acc => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </select>
        {this.state.type === TransactionType.Transfer && (
          <select
            className="select"
            value={this.state.toAccount.id}
            onChange={this.onToAccountChange}
          >
            <option value="" disabled>
              -- To Account --
            </option>
            {this.props.accounts.map(acc => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
        )}
        <select
          className="select"
          value={this.state.subject.id}
          onChange={this.onSubjectChange}
        >
          <option value="" disabled>
            -- Subject --
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
