const stylesReducerDefaults = {
  collapsed: false
};

export default (state = stylesReducerDefaults, action) => {
  switch (action.type) {
    case 'SET_COLLAPSED':
      return {
        ...state,
        collapsed: action.collapsed
      };
    default:
      return state;
  }
};
