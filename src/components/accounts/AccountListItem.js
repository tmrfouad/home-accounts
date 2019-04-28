import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import numeral from 'numeral';

const AccountListItem = ({ id, name, total, settings }) => (
  <div className="list-item">
    <Link className="list-item--content" to={`/accountform/${id}`}>
      <div>
        <h3 className="list-item__title">{name}</h3>
      </div>
    </Link>
    <Link className="list-item--content" to={`/acctrans/${id}`}>
      <h3
        className={
          'list-item__data' +
          (total === 0 ? '' : total < 0 ? ' negative' : ' positive')
        }
      >
        {settings.currencySymbol + numeral(total / 100).format('0,0.00')}
      </h3>
    </Link>
  </div>
);

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(AccountListItem);
