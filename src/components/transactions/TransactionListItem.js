import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import TransactionTypes from '../../enums/TransactionType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

const TransactionListItem = ({
  id,
  type,
  account,
  toAccount,
  subject,
  amount,
  createdAt,
  notes
}) => (
  <Link className="list-item" to={`/transedit/${id}`}>
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
      {numeral(amount / 100).format('$0,0.00')}
      <span
        className={
          'list-item__icon ' +
          (type === TransactionTypes.In
            ? 'list-item__icon--in'
            : type === TransactionTypes.Out
              ? 'list-item__icon--out'
              : 'list-item__icon--transfer')
        }
      >
        {type === TransactionTypes.In && (
          <FontAwesomeIcon className="font-awesome-icon" icon={faFileImport} />
        )}
        {type === TransactionTypes.Out && (
          <FontAwesomeIcon className="font-awesome-icon" icon={faFileExport} />
        )}
        {type === TransactionTypes.Transfer && (
          <FontAwesomeIcon className="font-awesome-icon" icon={faExchangeAlt} />
        )}
      </span>
    </h3>
  </Link>
);

export default TransactionListItem;
