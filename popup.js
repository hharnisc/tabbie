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

document.addEventListener('DOMContentLoaded', () => {
  getSelectedTabUrls()
    .then((tabs) => createTabs(tabs))
    .then((window) => console.log(window));
});
