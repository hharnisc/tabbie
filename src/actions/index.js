import { setState } from '../chromeStorage';
import { createTabs } from '../tabManager';

const SET_SAVE_SELECTED = 'SET_SAVE_SELECTED';

const setSaveSelected = saveSelected => ({
  type: SET_SAVE_SELECTED,
  saveSelected,
});

// TODO: handle error case with catch and visualize it
export const syncSaveSelected = saveSelected => dispatch =>
  setState({ saveSelected })
    .then(() => dispatch(setSaveSelected(saveSelected)));

export const openTabGroup = tabs => createTabs(tabs);
