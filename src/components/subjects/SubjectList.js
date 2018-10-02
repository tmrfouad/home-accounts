import React from 'react';
import { connect } from 'react-redux';
import SubjectListItem from './SubjectListItem';
import { Link } from 'react-router-dom';

export class SubjectList extends React.Component {
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
            <h2 className="page-header__title">Subjects</h2>
            <div className="page-header__actions">
              <Link className="button" to="/subjectform">
                Add Subject
              </Link>
            </div>
          </div>
        </div>
        <div
          className={
            this.props.styles.collapsed
              ? 'content-container content-container--collapsed'
              : 'content-container'
          }
        >
          <div className="list-header">
            <div>Name</div>
          </div>
          <div className="list-body">
            {this.props.subjects.length === 0 ? (
              <div className="list-item list-item--message">
                <span>No Subjects</span>
              </div>
            ) : (
              this.props.subjects.map(acc => (
                <SubjectListItem key={acc.id} {...acc} />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  subjects: state.subjects,
  styles: state.styles
});

export default connect(mapStateToProps)(SubjectList);
