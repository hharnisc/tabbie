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


const createTabListItem = (name, id) => {
  const listItem = document.createElement('li');
  const listItemContent = document.createTextNode(name);
  listItem.setAttribute('class', 'window-list-item');
  listItem.setAttribute('data-window-id', id);
  listItem.appendChild(listItemContent);
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
  emptyList.setAttribute('class', 'window-list--empty');
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

document.addEventListener('DOMContentLoaded', () => {
  const fakeWindowData = [
    {
      name: 'Stuff',
      urls: [
        'https://google.com',
        'https://news.ycombinator.com',
      ],
    },
    {
      name: 'Things',
      urls: [
        'https://google.com',
        'https://news.ycombinator.com',
      ],
    }
  ];
  displayTabGroupList(fakeWindowData);
  // getSelectedTabUrls()
  //   .then((tabs) => createTabs(tabs))
  //   .then((window) => console.log(window));
});
