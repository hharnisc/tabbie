const getSelectedTabUrls = () => new Promise((resolve) => {
  chrome.tabs.query({
      highlighted: true,
      lastFocusedWindow: true,
  }, (tabs) => {
      resolve(tabs.map((tab) => tab.url));
  });
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
  remove.setAttribute('class', 'tab-group-remove');
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
  chrome.storage.local.get(null, (tabGroups) => resolve(tabGroups.tabGroups || []));
});

const addTabGroup = (newTabGroup, tabGroups) => {
  tabGroups.push(newTabGroup);
  chrome.storage.local.set({ tabGroups });
};

const removeTabGroup = (id, tabGroups) => {
  tabGroups.splice(id, 1);
  chrome.storage.local.set({ tabGroups });
};

const clearTabGroups = () => new Promise((resolve) => {
  chrome.storage.local.clear(() => resolve());
});

const updateAndBindTabGroupList = () => {
  getTabGroups()
    .then((tabGroups) => {
      displayTabGroupList(tabGroups);
      bindClickHandlers('tab-group-open', (e) => {
        const tabGroupId = e.target.dataset.tabGroupId;
        createTabs(tabGroups[tabGroupId].tabs);
      });
      bindClickHandlers('tab-group-remove', (e) => {
        const tabGroupId = e.target.dataset.tabGroupId;
        removeTabGroup(tabGroupId, tabGroups);
      });
      bindClickHandlers('tab-group-save', (e) => {
        e.preventDefault();
        const newTabGroupName = document.getElementById('tab-group-new-name').value;
        if (newTabGroupName) {
          getSelectedTabUrls().then((tabs) => {
            addTabGroup({
                name: newTabGroupName,
                tabs,
              },
              tabGroups
            );
          });
        }
      });
    });
};

document.addEventListener('DOMContentLoaded', () => {
  updateAndBindTabGroupList();
  chrome.storage.onChanged.addListener(() => updateAndBindTabGroupList());
});
