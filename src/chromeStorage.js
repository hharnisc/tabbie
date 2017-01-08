export const setState = state => new Promise((resolve, reject) => {
  chrome.storage.sync.set(state, () => {
    if (chrome.runtime.error) {
      reject(chrome.runtime.error);
    } else {
      resolve();
    }
  });
});

export const getState = () => new Promise((resolve, reject) => {
  chrome.storage.sync.get(null, (state) => {
    if (chrome.runtime.error) {
      reject(chrome.runtime.error);
    } else {
      resolve(state);
    }
  });
});
