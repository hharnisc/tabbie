import { setState } from '../chromeStorage';

const SET_SAVE_SELECTED = 'SET_SAVE_SELECTED';

const setSaveSelected = saveSelected => ({
  type: SET_SAVE_SELECTED,
  saveSelected,
});

export const syncSaveSelected = saveSelected => dispatch =>
  setState({ saveSelected })
    .then(() => dispatch(setSaveSelected(saveSelected)));
