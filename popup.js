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

const createTabListItem = (name, id) => {
  const listItem = document.createElement('li');
  const listItemContent = document.createTextNode(name);
  listItem.setAttribute('class', 'tab-group-list-item');
  listItem.appendChild(listItemContent);
  listItem.appendChild(createOpenButton(id));
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
  listElement.appendChild(tabGroupListContent);

};

const bindClickHandlers = (elementClass, clickhandler) => {
  const elements = document.getElementsByClassName(elementClass);
  for(let i = 0; i < elements.length; i++) {
    var element = elements[i];
    element.onclick = clickhandler;
  }
};

const getTabGroups = () => new Promise((resolve, reject) => {
  chrome.storage.local.get(null, (tabGroups) => resolve(tabGroups));
});

document.addEventListener('DOMContentLoaded', () => {
  // const tabGroups = [
  //   {
  //     name: 'Stuff',
  //     tabs: [
  //       'https://google.com',
  //       'https://news.ycombinator.com',
  //     ],
  //   },
  //   {
  //     name: 'Things',
  //     tabs: [
  //       'https://buffer.com'
  //     ],
  //   }
  // ];
  const tabGroups = getTabGroups()
    .then((tabGroups) => {
      console.log(tabGroups);
      displayTabGroupList(tabGroups);
      bindClickHandlers('tab-group-open', (e) => {
        const tabGroupId = e.target.dataset.tabGroupId;
        createTabs(tabGroups[tabGroupId].tabs);
      });
    });
    // hook into the tab group save click event
    bindClickHandlers('tab-group-save', (e) => {
      e.preventDefault();
      const newTabGroupName = document.getElementById('tab-group-new-name').value;
      console.log('newTabGroupName', newTabGroupName);
    });
  // getSelectedTabUrls()
  //   .then((tabs) => createTabs(tabs))
  //   .then((window) => console.log(window));
});
