import {
  setState,
  getState,
  onChange,
} from '../chromeStorage';
import {
  ADD_TAB_GROUP,
  REMOVE_TAB_GROUP,
  SET_SAVE_SELECTED,
  REMOVE_TAB,
  resyncTabGroups,
  setSaveSelected,
  addTabGroup,
} from '../actions';

const chromeStorage = (store) => {
  onChange((changes) => {
    const state = store.getState();
    const { tabGroups } = state.tabGroupList;
    const { saveSelected } = state.tabGroupListControls;
    if (changes.tabGroups && tabGroups !== changes.tabGroups.newValue) {
      store.dispatch(resyncTabGroups(changes.tabGroups.newValue));
    }
    if (changes.saveSelected && saveSelected !== changes.saveSelected.newValue) {
      store.dispatch(setSaveSelected({ saveSelected: changes.saveSelected.newValue }));
    }
  });
  getState()
    .then((state) => {
      store.dispatch(setSaveSelected({ saveSelected: state.saveSelected || false }));
      if (state.tabGroups) {
        state.tabGroups.forEach((tabGroup) => {
          store.dispatch(addTabGroup({
            name: tabGroup.name,
            tabs: tabGroup.tabs,
          }));
        });
      }
    });
  return next => (action) => {
    if (action.sync) {
      switch (action.type) {
        case ADD_TAB_GROUP:
          setState({
            tabGroups: [
              ...store.getState().tabGroupList.tabGroups,
              { name: action.name, tabs: action.tabs },
            ],
          });
          break;
        case REMOVE_TAB_GROUP:
          setState({
            tabGroups:
              store.getState().tabGroupList.tabGroups
                .filter((tabGroup, i) => i !== action.tabGroupKey),
          });
          break;
        case SET_SAVE_SELECTED:
          setState({ saveSelected: action.saveSelected });
          break;
        case REMOVE_TAB:
          setState({
            tabGroups: store.getState().tabGroupList.tabGroups
              .map((tabGroup, tabGroupKey) => {
                if (tabGroupKey === action.tabGroupKey) {
                  return {
                    name: tabGroup.name,
                    tabs: tabGroup.tabs.filter((tab, tabKey) => tabKey !== action.tabKey),
                  };
                }
                return tabGroup;
              }),
          });
          break;
        default:
          break;
      }
    }
    return next(action);
  };
};

export default chromeStorage;
