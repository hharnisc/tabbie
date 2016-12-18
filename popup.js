const getSelectedTabs = () => new Promise((resolve) => {
  chrome.tabs.query({
      highlighted: true,
      lastFocusedWindow: true,
  }, (tabs) => {
      resolve(tabs.map((tab) => tab.url));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  getSelectedTabs()
    .then((tabs) => console.log(tabs));
});
