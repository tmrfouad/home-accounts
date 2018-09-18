import React from 'react';
import { Link } from 'react-router-dom';

const AccountListItem = ({ id, name }) => (
  <Link className="list-item" to={`/accountform/${id}`}>
    <div>
      <h3 className="list-item__title">{name}</h3>
    </div>
  </Link>
);

export default AccountListItem;
