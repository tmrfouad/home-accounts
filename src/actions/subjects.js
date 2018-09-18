import database from '../firebase/firebase';

// Add_SUBJECT
export const addSubject = subject => ({
  type: 'ADD_SUBJECT',
  subject
});

export const startAddSubject = (subjectData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { name = '' } = subjectData;

    const subject = {
      name
    };

    return database
      .ref(`users/${uid}/subjects`)
      .push(subject)
      .then(ref => {
        dispatch(addSubject({ id: ref.key, ...subject }));
      })
      .catch(() => {});
  };
};

// REMOVE_SUBJECT
export const removeSubject = ({ id }) => ({
  type: 'REMOVE_SUBJECT',
  id
});

export const startRemoveSubject = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/subjects/${id}`)
      .remove()
      .then(() => {
        dispatch(removeSubject({ id }));
      });
  };
};

// EDIT_SUBJECT
export const editSubject = ({ id } = {}, updates) => ({
  type: 'EDIT_SUBJECT',
  id,
  updates
});

export const startEditSubject = ({ id } = {}, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/subjects/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editSubject({ id }, updates));
      });
  };
};

// SET_SUBJECTS
export const setSubjects = subjects => ({
  type: 'SET_SUBJECTS',
  subjects
});

export const startSetSubjects = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/subjects`).once('value', snap => {
      const subjects = [];
      snap.forEach(childSnap => {
        subjects.push({
          id: childSnap.key,
          ...childSnap.val()
        });
      });
      dispatch(setSubjects(subjects));
    });
  };
};
