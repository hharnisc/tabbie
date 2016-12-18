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


const createWindowListItem = (name, id) => {
  const listItem = document.createElement('li');
  const listItemContent = document.createTextNode(name);
  listItem.setAttribute('class', 'window-list-item');
  listItem.setAttribute('data-window-id', id);
  listItem.appendChild(listItemContent);
  return listItem;
}

const createWindowList = (windowData) => {
  const windowList = document.createElement('ul');
  windowData.forEach((window, index) => {
    windowList.appendChild(createWindowListItem(window.name, index));
  });
  return windowList;
};

const displayWindows = (windowData) => {
  var root = document.getElementById('list');
  root.appendChild(createWindowList(windowData));
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
  displayWindows(fakeWindowData);
  // getSelectedTabUrls()
  //   .then((tabs) => createTabs(tabs))
  //   .then((window) => console.log(window));
});
