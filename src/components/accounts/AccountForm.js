import React from 'react';
import { connect } from 'react-redux';
import {
  startAddAccount,
  startEditAccount,
  startRemoveAccount
} from '../../actions/accounts';
import ConfirmModal from '../ConfirmModal';
import { BackButton } from '../BackButton';

export class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    const account = this.props.account;
    this.state = {
      name: account ? account.name : '',
      error: '',
      mode: account ? 'edit' : 'add',
      isModalOpen: false
    };
  }

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    if (!this.state.name) {
      this.setState({ error: 'Please enter a name!' });
    } else {
      if (this.state.mode === 'edit') {
        this.props.startEditAccount(this.props.account.id, {
          name: this.state.name
        });
      } else {
        if (this.props.accounts.find(acc => acc.name === this.state.name)) {
          this.setState({ error: 'This account already exists!' });
        } else {
          this.props.startAddAccount({
            name: this.state.name
          });
        }
      }
      this.props.history.push('/accounts');
    }
  };

  removeAccount = () => {
    this.props.startRemoveAccount(this.props.account.id);
    this.props.history.push('/accounts');
  };

  openRemoveItemDialog = e => {
    e.preventDefault();
    this.setState(() => ({ isModalOpen: true }));
  };

  closeRemoveItemDialog = () => {
    this.setState(() => ({ isModalOpen: false }));
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div
            className={
              this.props.styles.collapsed
                ? 'content-container content-container--collapsed'
                : 'content-container'
            }
          >
            <BackButton />
            <h2 className="page-header__title">
              {this.state.mode === 'edit' ? 'Edit' : 'Add'} Account
            </h2>
          </div>
        </div>
        <form
          className={
            this.props.styles.collapsed
              ? 'form content-container content-container--collapsed'
              : 'form content-container'
          }
          onSubmit={this.onFormSubmit}
        >
          {this.state.error && (
            <div className="form__error">{this.state.error}</div>
          )}
          <input
            type="text"
            className="text-input"
            autoFocus
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <div>
            <button className="button form__action">Save Account</button>
            {this.state.mode === 'edit' && (
              <button
                className="button form__action button--secondary"
                onClick={this.openRemoveItemDialog}
              >
                Remove Account
              </button>
            )}
          </div>
        </form>
        <ConfirmModal
          id="confirmModal"
          messageTitle="Remove Account!"
          messageBody="Are you sure you want to remove this item?"
          isOpen={this.state.isModalOpen}
          onModalClose={this.closeRemoveItemDialog}
          onModalOk={this.removeAccount}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  account: state.accounts.find(t => t.id === props.match.params.id),
  accounts: state.accounts,
  styles: state.styles
});

const mapDispatchToProps = dispatch => ({
  startAddAccount: account => dispatch(startAddAccount(account)),
  startEditAccount: (id, account) =>
    dispatch(startEditAccount({ id }, account)),
  startRemoveAccount: id => dispatch(startRemoveAccount({ id }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountForm);
