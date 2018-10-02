import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const SideBar = () => (
  <div className="sidenav">
    <button className="button button--link sidenav__collapse">
      <FontAwesomeIcon className="font-awesome-icon" icon={faBars} />
    </button>
    <Link className="button button--link" to="/accounts">
      <FontAwesomeIcon className="font-awesome-icon" icon={faFile} /> Accounts
    </Link>
    <Link className="button button--link" to="/subjects">
      <FontAwesomeIcon className="font-awesome-icon" icon={faTags} /> Subjects
    </Link>
  </div>
);

export default SideBar;
