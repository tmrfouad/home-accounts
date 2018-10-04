const settingsReducerDefaults = {
  defaultAccount: ''
};

export default (state = settingsReducerDefaults, action) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      return action.settings;
    case 'SAVE_SETTINGS':
      return { ...state, ...action.settings };
    default:
      return state;
  }
};
