import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setCollapsed } from '../actions/styles';

export const SideBar = ({ styles, setCollapsed }) => (
  <div className={styles.collapsed ? 'sidenav sidenav--collapsed' : 'sidenav'}>
    <button
      className="button button--link sidenav__collapse"
      onClick={() => {
        setCollapsed(!styles.collapsed);
      }}
    >
      <FontAwesomeIcon className="font-awesome-icon" icon={faBars} />
    </button>
    <Link className="button button--link" to="/accounts">
      <FontAwesomeIcon
        className="font-awesome-icon"
        icon={faFileInvoiceDollar}
      />
      <span> Accounts</span>
    </Link>
    <Link className="button button--link" to="/subjects">
      <FontAwesomeIcon className="font-awesome-icon" icon={faTasks} />
      <span> Subjects</span>
    </Link>
  </div>
);

const mapStateToProps = state => ({
  styles: state.styles
});

const mapDispatchToProps = dispatch => ({
  setCollapsed: collapsed => dispatch(setCollapsed(collapsed))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
