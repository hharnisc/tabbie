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

const createWindow = (urls) => new Promise((resolve) => {
  chrome.windows.create({
    url: urls,
  }, (window) => resolve(window));
});

const createTabs = (tabs) =>
  createWindow(tabs.map((tab) => tab.url ? tab.url : tab))
    .then(window => tabs.map((tab, i) => {
      return new Promise((resolve) => {
        if (tab.pinned) {
          chrome.tabs.update(window.tabs[i].id, {pinned: true}, () => resolve());
        } else {
          resolve();
        }
      });
    }))
    .then(tabPromises => Promise.all(tabPromises));


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
  listItemContentElement.setAttribute('tabindex', '0');
  listItemContentElement.appendChild(listItemContent);
  listItem.appendChild(listItemContentElement);
  listItem.appendChild(createOpenButton(id));
  listItem.appendChild(createRemoveButton(id));
  return listItem;
}

const createTabGroupList = (tabGroupData) => {
  const tabGroupList = document.createElement('ul');
  tabGroupList.setAttribute('class', 'tab-group-list');
  tabGroupList.setAttribute('aria-label', 'tab groups');
  tabGroupList.setAttribute('tabindex', '0');
  tabGroupData.forEach((window, index) => {
    tabGroupList.appendChild(createTabListItem(window.name, index));
  });
  return tabGroupList;
};

const focusTabGroupList = () => {
  const tabGroupList = document.getElementsByClassName('tab-group-list');
  tabGroupList.focus();
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
  focusTabGroupList();
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

const setTabGroupNameInvalid = () => {
  const tabGroupNameInput = document.getElementById('tab-group-new-name');
  tabGroupNameInput.classList.add('invalid');
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

const handleSaveClick = (e, tabGroups, saveSelected) => {
  e.preventDefault();
  validateTabGroupName()
    .then(() => {
      if (saveSelected) {
        return getSelectedTabs();
      }
      return getAllTabs();
     })
    .then((tabs) => tabs.map((tab) => ({
      url: tab.url,
      pinned: tab.pinned,
    })))
    .then((tabs) => {
      addTabGroup({
          name: getTabGroupName(),
          tabs,
        },
        tabGroups
      );
      resetTabGroupName();
      ga('send', {
        hitType: 'event',
        eventCategory: 'TabGroup',
        eventAction: 'save',
        eventValue: tabs.length,
      });
    })
    .catch((err) => {
      if (err.message === 'Tab Name Is Invalid') {
        setTabGroupNameInvalid();
      } else {
        console.error(err);
      }
    });
};

const handleSaveAndCloseClick = (e, tabGroups, saveSelected) => {
  e.preventDefault();
  validateTabGroupName()
    .then(() => {
      if (saveSelected) {
        return getSelectedTabs();
      }
      return getAllTabs();
     })
    .then((tabs) => {
      addTabGroup({
          name: getTabGroupName(),
          tabs: tabs.map((tab) => ({
            url: tab.url,
            pinned: tab.pinned,
          })),
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
        setTabGroupNameInvalid();
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

const bindSaveHandlers = (tabGroups, saveSelected) => {
  const tabGroupNameInput = document.getElementById('tab-group-new-name')
  tabGroupNameInput.onblur = () => tabGroupNameInput.classList.remove('invalid');
  bindClickHandlers('tab-group-save', (e) => handleSaveClick(e, tabGroups, saveSelected));
  bindClickHandlers('tab-group-save-close', (e) => handleSaveAndCloseClick(e, tabGroups, saveSelected));
  bindClickHandlers('tab-group-save-cb', (e) => handleSaveSelectCallbackClick(e));
};

const updateAndBindUI = () => {
  Promise.all([getTabGroups(), getSaveSelectedState()])
    .then(([tabGroups, saveSelected]) => {
      displayTabGroupList(tabGroups);
      updateSaveButtonText(saveSelected);
      updateSaveOnlySelectedCheckbox(saveSelected);
      bindTabGroupList(tabGroups);
      bindSaveHandlers(tabGroups, saveSelected);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  updateAndBindUI();
  chrome.storage.onChanged.addListener(() => updateAndBindUI());
});
