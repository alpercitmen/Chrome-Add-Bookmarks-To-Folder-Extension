// change icon when bookmark is found
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        var tabUrl = tab.url;
        chrome.bookmarks.search({ url: tabUrl }, function (bookmarks) {
            if (bookmarks.length > 0) {
                chrome.action.setIcon({ path: 'icons/icon128f.png' });
            } else {
                chrome.action.setIcon({ path: 'icons/icon128s.png' });
            }
        });
    });
});