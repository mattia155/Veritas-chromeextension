// Background script: listen for messages or actions

// Listener on messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // Update badge message from content.js
  if (msg.action === "updateView") {
    if (msg.value) {
      chrome.browserAction.setBadgeText({"text":"ON"});
      localStorage['divvis'] = 1;
      localStorage['getreq'] = true;
    } 
    else {
      chrome.browserAction.setBadgeText({"text":""});
      localStorage['divvis'] = 0;
      localStorage['getreq'] = false;
    }
  }
  if (msg.action === 'storeTitle') {
    localStorage['title'] = msg.value;
  }
});

// Fires when active tab changes
chrome.tabs.onActivated.addListener(callContent);
function callContent() {
  // Run content script 
  chrome.tabs.executeScript(null, {file: "jquery.js"}, function(){
    chrome.tabs.executeScript(null, {file: "content.js"});
  }); 
}
