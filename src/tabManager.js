const createWindow = urls => new Promise((resolve) => {
  chrome.windows.create({ url: urls }, window => resolve(window));
});

export const createTabs = tabs =>
  createWindow(tabs.map(tab => (tab.url ? tab.url : tab)))
    .then(window => tabs.map((tab, i) =>
      new Promise((resolve) => {
        if (tab.pinned) {
          chrome.tabs.update(window.tabs[i].id, { pinned: true }, () => resolve());
        } else {
          resolve();
        }
      }),
    ))
    .then(tabPromises => Promise.all(tabPromises));
