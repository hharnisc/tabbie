const getSelectedTabs = () => new Promise((resolve, reject) => {
  chrome.tabs.query({
    highlighted: true,
    lastFocusedWindow: true,
  }, (tabs) => {
      resolve(tabs);
  });
});

const getAllTabs = () => new Promise((resolve, reject) => {
  chrome.tabs.query({
    lastFocusedWindow: true,
  }, (tabs) => {
      resolve(tabs);
  });
});

const closeTabsWithIds = (tabIds) => new Promise((resolve, reject) => {
  chrome.tabs.remove(tabIds, () => resolve());
});

const createTabs = (urls) => new Promise((resolve) => {
  chrome.windows.create({
    url: urls,
  }, (window) => resolve(window));
});

const createOpenButton = (id) => {
  const openButton = document.createElement('button');
  const buttonText = document.createTextNode('open');
  openButton.setAttribute('class', 'tab-group-open');
  openButton.setAttribute('data-tab-group-id', id);
  openButton.appendChild(buttonText);
  return openButton;
};

const createRemoveButton = (id) => {
  const remove = document.createElement('button');
  const buttonText = document.createTextNode('remove');
  remove.setAttribute('class', 'tab-group-remove danger');
  remove.setAttribute('data-tab-group-id', id);
  remove.appendChild(buttonText);
  return remove;
};

const createTabListItem = (name, id) => {
  const listItem = document.createElement('li');
  const listItemContentElement = document.createElement('div');
  const listItemContent = document.createTextNode(name);
  listItemContentElement.setAttribute('class', 'tab-group-list-item-content');
  listItem.setAttribute('class', 'tab-group-list-item');
  listItemContentElement.appendChild(listItemContent);
  listItem.appendChild(listItemContentElement);
  listItem.appendChild(createOpenButton(id));
  listItem.appendChild(createRemoveButton(id));
  return listItem;
}

const createTabGroupList = (tabGroupData) => {
  const windowList = document.createElement('ul');
  tabGroupData.forEach((window, index) => {
    windowList.appendChild(createTabListItem(window.name, index));
  });
  return windowList;
};

const createEmptyTabGroupList = () => {
  const emptyList = document.createElement('div');
  const emptyListContent = document.createTextNode('No saved tab groups... yet');
  emptyList.setAttribute('class', 'tab-group-list--empty');
  emptyList.appendChild(emptyListContent);
  return emptyList;
};

const displayTabGroupList = (tabGroupData) => {
  let tabGroupListContent;
  if (tabGroupData.length) {
    tabGroupListContent = createTabGroupList(tabGroupData);
  } else {
    tabGroupListContent = createEmptyTabGroupList();
  }
  const listElement = document.getElementsByClassName('list')[0];
  listElement.innerHTML = '';
  listElement.appendChild(tabGroupListContent);
};

const bindClickHandlers = (elementClass, clickhandler) => {
  const elements = document.getElementsByClassName(elementClass);
  for(let i = 0; i < elements.length; i++) {
    var element = elements[i];
    element.onclick = clickhandler;
  }
};

const getTabGroups = () => new Promise((resolve) => {
  chrome.storage.sync.get(null, (state) => resolve(state.tabGroups || []));
});

const addTabGroup = (newTabGroup, tabGroups) => {
  tabGroups.push(newTabGroup);
  chrome.storage.sync.set({ tabGroups }, () => {
    if (chrome.runtime.error) {
      console.error(chrome.runtime.error);
    }
  });
};

const removeTabGroup = (id, tabGroups) => {
  tabGroups.splice(id, 1);
  chrome.storage.sync.set({ tabGroups }, () => {
    if (chrome.runtime.error) {
      console.error(chrome.runtime.error);
    }
  });
};

const clearTabGroups = () => new Promise((resolve) => {
  chrome.storage.sync.clear(() => {
    if (chrome.runtime.error) {
      console.error(chrome.runtime.error);
    }
    resolve();
  });
});

const setSaveSelectedState = (saveSelected) => new Promise((resolve) => {
  chrome.storage.sync.set({ saveSelected }, () => {
    if (chrome.runtime.error) {
      console.error(chrome.runtime.error);
    }
    resolve();
  });
});

const getSaveSelectedState = () => new Promise((resolve) => {
  chrome.storage.sync.get(null, (state) => resolve(state.saveSelected || false));
});

const getTabGroupName = () => {
  const tabGroupNameInput = document.getElementById('tab-group-new-name');
  return tabGroupNameInput.value;
};

const validateTabGroupName = () => new Promise((resolve, reject) => {
  const newTabGroupName = getTabGroupName();
  if (newTabGroupName) {
    resolve(newTabGroupName);
  } else {
    reject(new Error('Tab Name Is Invalid'));
  }
});

const resetTabGroupName = () => {
  const tabGroupNameInput = document.getElementById('tab-group-new-name');
  tabGroupNameInput.value = '';
};

const handleSaveClick = (e, tabGroups) => {
  e.preventDefault();
  let newTabGroupName;
  validateTabGroupName()
    .then(() => getSelectedTabs())
    .then((tabs) => tabs.map((tab) => tab.url))
    .then((urls) => {
      addTabGroup({
          name: getTabGroupName(),
          tabs: urls,
        },
        tabGroups
      );
      resetTabGroupName();
      ga('send', {
        hitType: 'event',
        eventCategory: 'TabGroup',
        eventAction: 'save',
        eventValue: urls.length,
      });
    })
    .catch((err) => {
      if (err.message === 'Tab Name Is Invalid') {
        tabGroupNameInput.classList.add('invalid');
      } else {
        console.error(err);
      }
    });
};

const handleSaveAndCloseClick = (e, tabGroups) => {
  e.preventDefault();
  let newTabGroupName;
  validateTabGroupName()
    .then(() => getSelectedTabs())
    .then((tabs) => {
      addTabGroup({
          name: getTabGroupName(),
          tabs: tabs.map((tab) => tab.url),
        },
        tabGroups
      );
      resetTabGroupName();
      ga('send', {
        hitType: 'event',
        eventCategory: 'TabGroup',
        eventAction: 'saveAndClose',
        eventValue: tabs.length,
      });
      closeTabsWithIds(tabs.map((tab) => tab.id));
    })
    .catch((err) => {
      if (err.message === 'Tab Name Is Invalid') {
        tabGroupNameInput.classList.add('invalid');
      } else {
        console.error(err);
      }
    });
};

const handleSaveSelectCallbackClick = (e) => {
  e.preventDefault();
  const saveOnlySelectedCb = document.getElementById('save-only-selected');
  setSaveSelectedState(saveOnlySelectedCb.checked);
};

const updateSaveOnlySelectedCheckbox = (saveSelected) => {
  const saveOnlySelectedCb = document.getElementById('save-only-selected');
  saveOnlySelectedCb.checked = saveSelected;
};

const updateSaveButtonText = (saveSelected) => {
  document.getElementsByClassName('tab-group-save')[0]
    .innerHTML = !saveSelected ? 'Save All Tabs' : 'Save Selected Tabs';
  document.getElementsByClassName('tab-group-save-close')[0]
    .innerHTML = !saveSelected ? 'Save & Close All Tabs' : 'Save & Close Selected Tabs';
};

const bindTabGroupList = (tabGroups) => {
  bindClickHandlers('tab-group-open', (e) => {
    const tabGroupId = e.target.dataset.tabGroupId;
    const { tabs } = tabGroups[tabGroupId];
    createTabs(tabs);
    ga('send', {
      hitType: 'event',
      eventCategory: 'TabGroup',
      eventAction: 'open',
      eventValue: tabs.length,
    });
  });
  bindClickHandlers('tab-group-remove', (e) => {
    const tabGroupId = e.target.dataset.tabGroupId;
    const { tabs } = tabGroups[tabGroupId];
    removeTabGroup(tabGroupId, tabGroups);
    ga('send', {
      hitType: 'event',
      eventCategory: 'TabGroup',
      eventAction: 'remove',
      eventValue: tabs.length,
    });
  });
};

const bindSaveHandlers = (tabGroups) => {
  const tabGroupNameInput = document.getElementById('tab-group-new-name')
  tabGroupNameInput.onblur = () => tabGroupNameInput.classList.remove('invalid');
  bindClickHandlers('tab-group-save', (e) => handleSaveClick(e, tabGroups));
  bindClickHandlers('tab-group-save-close', (e) => handleSaveAndCloseClick(e, tabGroups));
  bindClickHandlers('tab-group-save-cb', (e) => handleSaveSelectCallbackClick(e));
};

const updateAndBindUI = () => {
  Promise.all([getTabGroups(), getSaveSelectedState()])
    .then(([tabGroups, saveSelected]) => {
      displayTabGroupList(tabGroups);
      updateSaveButtonText(saveSelected);
      updateSaveOnlySelectedCheckbox(saveSelected);
      bindTabGroupList(tabGroups);
      bindSaveHandlers(tabGroups);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  updateAndBindUI();
  chrome.storage.onChanged.addListener(() => updateAndBindUI());
});
