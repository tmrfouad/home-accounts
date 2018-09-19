// Subjects Reducer

const subjectsReducerDefaultState = [];

export default (state = subjectsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_SUBJECT':
      return [...state, action.subject];
    case 'REMOVE_SUBJECT':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_SUBJECT':
      return state.map(
        subject =>
          subject.id === action.id ? { ...subject, ...action.updates } : subject
      );
    case 'SET_SUBJECTS':
      return action.subjects;
    default:
      return state;
  }
};
