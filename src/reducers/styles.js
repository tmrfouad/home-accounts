const stylesReducerDefaults = {
  collapsed: false
};

export default (state = stylesReducerDefaults, action) => {
  switch (action.type) {
    case 'SET_COLLAPSED':
      return {
        collapsed: action.collapsed
      };
    default:
      return state;
  }
};
