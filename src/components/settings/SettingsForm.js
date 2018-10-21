import React from 'react';
import { connect } from 'react-redux';
import AutoComplete from '../AutoComplete';
import { startSaveSettings } from '../../actions/settings';

export class SettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultAccount: props.settings ? props.settings.defaultAccount : '',
      newAfterSave: props.settings ? props.settings.newAfterSave : 0,
      error: '',
      success: false
    };
  }

  onDefaultAccountChange = defaultAccount => {
    this.setState({
      defaultAccount
    });
  };

  onNewAfterSaveChange = e => {
    this.setState({
      newAfterSave: e.target.checked
    });
  };

  onSave = e => {
    e.preventDefault();
    if (!this.state.defaultAccount) {
      this.setState({ error: 'Please select a default account.' });
      return;
    }
    this.props
      .startSaveSettings({
        defaultAccount: this.state.defaultAccount,
        newAfterSave: this.state.newAfterSave
      })
      .then(() => {
        this.setState({ error: '', success: true });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div
            className={
              this.props.styles.collapsed
                ? 'content-container content-container--collapsed'
                : 'content-container'
            }
          >
            <h2 className="page-header__title">Settings</h2>
          </div>
        </div>
        <form
          className={
            this.props.styles.collapsed
              ? 'form content-container content-container--collapsed'
              : 'form content-container'
          }
        >
          {this.state.error && (
            <div className="form__error">{this.state.error}</div>
          )}
          <AutoComplete
            id="defaultAccount"
            source={this.props.accounts}
            displayField="name"
            valueField="id"
            onChange={this.onDefaultAccountChange}
            value={this.state.defaultAccount}
            placeholder="Default Account"
            className="text-input width-100p"
          />
          <div>
            <input
              type="checkbox"
              id="newAfterSave"
              value={this.state.newAfterSave.toString()}
              checked={this.state.newAfterSave}
              onChange={this.onNewAfterSaveChange}
            />
            <label htmlFor="newAfterSave">
              Add new transaction after saving?
            </label>
          </div>
          <div>
            <button className="button form__action" onClick={this.onSave}>
              Save
            </button>
            {this.state.success && (
              <div className="form__success">Settings saved successfully!</div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
  accounts: state.accounts,
  styles: state.styles
});

const mapDispatchToProps = dispatch => ({
  startSaveSettings: settings => dispatch(startSaveSettings(settings))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm);
