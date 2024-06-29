chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content_script.js']
    }).then(() => {
      console.log('Content script injected successfully');
    }).catch((error) => {
      console.error('Error injecting content script:', error);
    });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openResultsTab") {
      chrome.tabs.create({url: 'results.html'}, (newTab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === newTab.id && info.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.tabs.sendMessage(tabId, {
              action: "displayResults",
              results: message.results
            });
          }
        });
      });
    }
  });