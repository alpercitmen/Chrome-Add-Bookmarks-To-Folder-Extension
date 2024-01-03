// change icon when bookmark is found
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        var tabUrl = tab.url;
        chrome.bookmarks.search({ url: tabUrl }, function (bookmarks) {
            if (bookmarks.length > 0) {
                chrome.action.setIcon({ path: 'icons/icon_10.png' });
            } else {
                chrome.action.setIcon({ path: 'icons/icon_9.png' });
            }
        });
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    var tabUrl = tab.url;
    chrome.bookmarks.search({ url: tabUrl }, function (bookmarks) {
        if (bookmarks.length > 0) {
            chrome.action.setIcon({ path: 'icons/icon_10.png' });
        } else {
            chrome.action.setIcon({ path: 'icons/icon_9.png' });
        }
    });
});