import React from 'react';
import SkFadingCircleSpinner from './spinners/SkFadingCircleSpinner';

export const LoadingPage = () => (
  <div className="loader">
    <SkFadingCircleSpinner />
  </div>
);

export default LoadingPage;
