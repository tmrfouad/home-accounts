import React from 'react';
import { connect } from 'react-redux';
import {
  startAddSubject,
  startEditSubject,
  startRemoveSubject
} from '../../actions/subjects';
import ConfirmModal from '../ConfirmModal';

export class SubjectForm extends React.Component {
  constructor(props) {
    super(props);
    const subject = this.props.subject;
    this.state = {
      name: subject ? subject.name : '',
      error: '',
      mode: subject ? 'edit' : 'add',
      isModalOpen: false
    };
  }

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    if (!this.state.name) {
      this.setState({ error: 'Please enter a name!' });
    } else {
      if (this.state.mode === 'edit') {
        this.props.startEditSubject(this.props.subject.id, {
          name: this.state.name
        });
      } else {
        if (this.props.subjects.find(acc => acc.name === this.state.name)) {
          this.setState({ error: 'This subject already exists!' });
        } else {
          this.props.startAddSubject({
            name: this.state.name
          });
        }
      }
      this.props.history.push('/subjects');
    }
  };

  removeSubject = () => {
    this.props.startRemoveSubject(this.props.subject.id);
    this.props.history.push('/subjects');
  };

  openRemoveItemDialog = e => {
    e.preventDefault();
    this.setState(() => ({ isModalOpen: true }));
  };

  closeRemoveItemDialog = () => {
    this.setState(() => ({ isModalOpen: false }));
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
            <h2 className="page-header__title">
              {this.state.mode === 'edit' ? 'Edit' : 'Add'} Subject
            </h2>
          </div>
        </div>
        <form
          className={
            this.props.styles.collapsed
              ? 'form content-container content-container--collapsed'
              : 'form content-container'
          }
          onSubmit={this.onFormSubmit}
        >
          {this.state.error && (
            <div className="form__error">{this.state.error}</div>
          )}
          <input
            type="text"
            className="text-input"
            autoFocus
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <div>
            <button className="button form__action">Save Subject</button>
            {this.state.mode === 'edit' && (
              <button
                className="button form__action button--secondary"
                onClick={this.openRemoveItemDialog}
              >
                Remove Subject
              </button>
            )}
          </div>
        </form>
        <ConfirmModal
          id="confirmModal"
          messageTitle="Remove Subject!"
          messageBody="Are you sure you want to remove this item?"
          isOpen={this.state.isModalOpen}
          onModalClose={this.closeRemoveItemDialog}
          onModalOk={this.removeSubject}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  subject: state.subjects.find(t => t.id === props.match.params.id),
  subjects: state.subjects,
  styles: state.styles
});

const mapDispatchToProps = dispatch => ({
  startAddSubject: subject => dispatch(startAddSubject(subject)),
  startEditSubject: (id, subject) =>
    dispatch(startEditSubject({ id }, subject)),
  startRemoveSubject: id => dispatch(startRemoveSubject({ id }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectForm);
