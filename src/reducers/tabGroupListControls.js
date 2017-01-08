const tabGroupListControls = (state = { saveSelected: false }, action) => {
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
