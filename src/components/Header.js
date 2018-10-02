import React from 'react';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const Header = ({ styles, startLogout }) => (
  <header className={styles.collapsed ? 'header header--collapsed' : 'header'}>
    <div className="header__content">
      <Link className="header__title" to="/transactions">
        <h1>Home Accounts</h1>
      </Link>
      <div>
        <button className="button button--link" onClick={startLogout}>
          <FontAwesomeIcon className="font-awesome-icon" icon={faSignOutAlt} />{' '}
          <span className="show-for-desktop">Logout</span>
        </button>
        <button className="button button--link show-for-mobile">
          <FontAwesomeIcon className="font-awesome-icon" icon={faBars} />
        </button>
      </div>
    </div>
  </header>
);

const mapStateToProps = state => ({ styles: state.styles });

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
