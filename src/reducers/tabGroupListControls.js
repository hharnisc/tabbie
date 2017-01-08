const tabGroupListControls = (state, action) => {
  switch (action.type) {
    case 'SET_SAVE_SELECTED':
      return {
        saveSelected: action.saveSelected,
      };
    default:
      return state;
  }
};

export default tabGroupListControls;
