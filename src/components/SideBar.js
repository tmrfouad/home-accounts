import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setCollapsed } from '../actions/styles';
import { SideMenu } from './SideMenu';

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
    <SideMenu />
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
