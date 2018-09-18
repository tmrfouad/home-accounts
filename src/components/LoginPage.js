import React from 'react';
import { startLoginWithGoogle, startLoginWithGithub } from '../actions/auth';
import { connect } from 'react-redux';

export const LoginPage = ({ startLoginWithGoogle, startLoginWithGithub }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It's time to get your expenses under control.</p>
      <button
        onClick={startLoginWithGoogle}
        className="button button--xs-margin-y button--full-width"
      >
        Login with Google
      </button>
      <button
        onClick={startLoginWithGithub}
        className="button button--xs-margin-y button--full-width"
      >
        Login with Github
      </button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
  startLoginWithGithub: () => dispatch(startLoginWithGithub())
});

export default connect(
  undefined,
  mapDispatchToProps
)(LoginPage);
