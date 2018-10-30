import React from 'react';
import { connect } from 'react-redux';
import AccountListItem from './AccountListItem';
import { Link } from 'react-router-dom';

export class AccountList extends React.Component {
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
            <h2 className="page-header__title">Accounts</h2>
            <div className="page-header__actions">
              <Link className="button" to="/accountform">
                Add Account
              </Link>
            </div>
          </div>
        </div>
        <div
          className={
            this.props.styles.collapsed
              ? 'content-container content-container--collapsed'
              : 'content-container'
          }
        >
          <div className="list-header">
            <div>Name</div>
            <div>Balance</div>
          </div>
          <div className="list-body">
            {this.props.accounts.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No Accounts</span>
              </div>
            ) : (
              this.props.accounts.map(acc => (
                <AccountListItem key={acc.id} {...acc} />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts,
  styles: state.styles
});

export default connect(mapStateToProps)(AccountList);
