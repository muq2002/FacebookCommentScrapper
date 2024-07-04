chrome.action.onClicked.addListener((tab) => {
  if (tab.url.startsWith("https://www.facebook.com")) {
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        files: ["content_script.js"],
      })
      .then(() => {
        console.log("Content script injected successfully");
      })
      .catch((error) => {
        console.error("Error injecting content script:", error);
      });
  } else {
    console.log("Extension is not designed to work on this site");
    // Optionally, you can show a notification to the user
    chrome.action.setPopup({
      tabId: tab.id,
      popup: "public/popup.html",
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openResultsTab") {
    chrome.tabs.create({ url: "public/results.html" }, (newTab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === newTab.id && info.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          chrome.tabs.sendMessage(tabId, {
            action: "displayResults",
            results: message.results,
          });
        }
      });
    });
  }
});
