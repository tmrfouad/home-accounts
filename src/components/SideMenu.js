import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

export const SideMenu = () => (
  <div className="side-menu">
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

export default SideMenu;
