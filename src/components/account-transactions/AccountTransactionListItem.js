import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import TransactionTypes from '../../enums/TransactionType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExchangeAlt,
  faFileImport,
  faFileExport
} from '@fortawesome/free-solid-svg-icons';

const AccountTransactionListItem = ({
  id,
  type,
  account,
  toAccount,
  subject,
  amount,
  createdAt,
  notes,
  settings,
  filterAccId
}) => (
  <div className="list-item">
    <div>
      <h3 className="list-item__title">{notes || subject.name}</h3>
      <span className="list-item__sub-title">
        {moment(createdAt).format('MMMM Do, YYYY')}
      </span>
      <span className="list-item__sub-title">
        {' - '}
        {account.name}
      </span>
      {type === TransactionTypes.Transfer && (
        <span className="list-item__sub-title">
          {' ==> '}
          {!!toAccount && toAccount.name}
        </span>
      )}
    </div>
    <h3 className="list-item__data">
      {settings.currencySymbol + numeral(amount / 100).format('0,0.00')}
      <span
        className={
          'list-item__icon ' +
          (type === TransactionTypes.In ||
          (type === TransactionTypes.Transfer && toAccount.id === filterAccId)
            ? 'list-item__icon--in'
            : type === TransactionTypes.Out ||
              (type === TransactionTypes.Transfer && account.id === filterAccId)
            ? 'list-item__icon--out'
            : '')
        }
      >
        {(type === TransactionTypes.In ||
          (type === TransactionTypes.Transfer &&
            toAccount.id === filterAccId)) && (
          <FontAwesomeIcon className="font-awesome-icon" icon={faFileImport} />
        )}
        {(type === TransactionTypes.Out ||
          (type === TransactionTypes.Transfer &&
            account.id === filterAccId)) && (
          <FontAwesomeIcon className="font-awesome-icon" icon={faFileExport} />
        )}
      </span>
    </h3>
  </div>
);

// {type === TransactionTypes.Transfer && (
//   <FontAwesomeIcon className="font-awesome-icon" icon={faExchangeAlt} />
// )}

const mapStateToProps = state => ({
  settings: state.settings,
  filterAccId: state.accTransFilters.accountId
});

export default connect(mapStateToProps)(AccountTransactionListItem);
