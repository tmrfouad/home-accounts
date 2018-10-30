import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks,
  faFileInvoiceDollar,
  faCog,
  faHome,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';

export const SideMenu = () => (
  <div className="side-menu">
    <Link className="button button--link" to="/">
      <FontAwesomeIcon className="font-awesome-icon" icon={faHome} />
      <span> Home</span>
    </Link>
    <Link className="button button--link" to="/acctrans">
      <FontAwesomeIcon className="font-awesome-icon" icon={faChartBar} />
      <span> Ledger</span>
    </Link>
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
    <Link className="button button--link" to="/settings">
      <FontAwesomeIcon className="font-awesome-icon" icon={faCog} />
      <span> Settings</span>
    </Link>
  </div>
);

export default SideMenu;
