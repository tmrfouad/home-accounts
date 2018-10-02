import React from 'react';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SideMenu } from './SideMenu';

export class Header extends React.Component {
  onMobileMenuClick = () => {
    const menu = document.querySelector('.mobile-menu');
    const menuDisplay = menu.style.display;
    if (!menuDisplay || menuDisplay === 'none') {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  };

  createMobileMenu() {
    const menu = document.querySelector('.mobile-menu');

    document.addEventListener('click', e => {
      if (
        e.target.closest('.mobile-menu') ||
        e.target.closest('.expand-menu-button')
      ) {
        return;
      }
      menu.style.display = 'none';
    });
  }

  componentDidMount() {
    this.createMobileMenu();
  }

  render() {
    return (
      <header
        className={
          this.props.styles.collapsed ? 'header header--collapsed' : 'header'
        }
      >
        <div className="header__content">
          <Link className="header__title" to="/transactions">
            <h1>Home Accounts</h1>
          </Link>
          <div>
            <button
              className="button button--link"
              onClick={this.props.startLogout}
            >
              <FontAwesomeIcon
                className="font-awesome-icon"
                icon={faSignOutAlt}
              />{' '}
              <span className="show-for-desktop">Logout</span>
            </button>
            <button
              className="button button--link show-for-mobile expand-menu-button"
              onClick={this.onMobileMenuClick}
            >
              <FontAwesomeIcon className="font-awesome-icon" icon={faBars} />
            </button>
          </div>
        </div>
        <div className="mobile-menu">
          <SideMenu />
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({ styles: state.styles });

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
