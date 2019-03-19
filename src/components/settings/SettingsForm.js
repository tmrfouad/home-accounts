import React from 'react';
import { connect } from 'react-redux';
import AutoComplete from '../AutoComplete';
import { startSaveSettings } from '../../actions/settings';
import { startUpdateTransTotal } from '../../actions/transactions';
import { startUpdateAccountsTotals } from '../../actions/accounts';

export class SettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultAccount: props.settings ? props.settings.defaultAccount : '',
      newAfterSave: props.settings ? props.settings.newAfterSave : 0,
      currencySymbol: props.settings ? props.settings.currencySymbol : '',
      monthStart: props.settings ? props.settings.monthStart : 1,
      error: '',
      success: false,
      updateTotals: false,
      saving: false
    };
  }

  onDefaultAccountChange = defaultAccount => {
    this.setState({
      defaultAccount
    });
  };

  onCurrencySymbolChange = e => {
    this.setState({
      currencySymbol: e.target.value
    });
  };

  onMonthStartChange = e => {
    this.setState({
      monthStart: +e.target.value
    });
  }

  onNewAfterSaveChange = e => {
    this.setState({
      newAfterSave: e.target.checked
    });
  };

  onUpdateTotalsChange = e => {
    this.setState({
      updateTotals: e.target.checked
    });
  };

  onSave = e => {
    e.preventDefault();
    this.setState({ error: '', success: false, saving: true });
    if (!this.state.defaultAccount) {
      this.setState({ error: 'Please select a default account.' });
      this.setState({ saving: false });
      return;
    }
    if (!this.state.currencySymbol) {
      this.setState({ error: 'Please select a currency symbol.' });
      this.setState({ saving: false });
      return;
    }

    if (this.state.updateTotals) {
      this.props
        .startUpdateTransTotal()
        .then(() => this.props.startUpdateAccountsTotals())
        .catch(error => {
          this.setState({ error: error.message });
        })
        .then(() => this.saveSettings())
        .catch(error => {
          this.setState({ error: error.message });
        });
    } else {
      this.saveSettings();
    }
  };

  saveSettings = () => {
    return this.props
      .startSaveSettings({
        defaultAccount: this.state.defaultAccount,
        newAfterSave: this.state.newAfterSave,
        currencySymbol: this.state.currencySymbol,
        monthStart: this.state.monthStart
      })
      .then(() => {
        this.setState({ updateTotals: false });
        this.setState({ error: '', success: true });
        this.setState({ saving: false });
      })
      .catch(error => {
        this.setState({ error: error.message });
        this.setState({ saving: false });
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
            className="width-100p"
            showLabel
          />
          <div>
            <label className="d-block">Currency Symbol</label>
            <input
              type="text"
              className="text-input"
              placeholder="Currency Symbol"
              value={this.state.currencySymbol}
              onChange={this.onCurrencySymbolChange}
            />
          </div>
          <div>
            <label>Default Month Start</label>
            <select
              className="select-inline"
              value={this.state.monthStart}
              onChange={this.onMonthStartChange}
            >
              <option value={undefined}></option>
              {
                ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
                  .map(d => (<option key={d} value={+d}>{d}</option>))
              }
            </select>
          </div>
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
            <input
              type="checkbox"
              id="updateTotals"
              value={this.state.updateTotals.toString()}
              checked={this.state.updateTotals}
              onChange={this.onUpdateTotalsChange}
            />
            <label htmlFor="updateTotals">
              Update Transactions / Accounts totals?
            </label>
          </div>
          <div>
            <button className="button form__action" onClick={this.onSave}>
              Save
            </button>
            {this.state.saving && (
              <div className="form__message">Saving ...</div>
            )}
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
  startSaveSettings: settings => dispatch(startSaveSettings(settings)),
  startUpdateTransTotal: () => dispatch(startUpdateTransTotal()),
  startUpdateAccountsTotals: () => dispatch(startUpdateAccountsTotals())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm);
