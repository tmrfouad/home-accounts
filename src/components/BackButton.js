import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { history } from '../routers/AppRouter';

export const BackButton = () => (
  <button
    className="button button--link--dark"
    href="javascript:void(0);"
    onClick={() => history.goBack()}
  >
    <FontAwesomeIcon icon={faChevronLeft} /> Back
  </button>
);
