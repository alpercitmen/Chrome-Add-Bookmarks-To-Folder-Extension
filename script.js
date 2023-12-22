/* get all chrome tabs */
function getAllTabs(callback) {
    createBookmarkFolder(function (newFolder) {
        var selectedTabs = [];
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                selectedTabs.push({
                    title: tab.title,
                    url: tab.url
                });
            });
            callback(newFolder.id, selectedTabs);
        });
    });
}

/* get only selected chrome tabs */
function getSelectedTabs(callback) {
    createBookmarkFolder(function (newFolder) {
        var selectedTabs = [];
        chrome.tabs.query({ highlighted: true }, function (tabs) {
            tabs.forEach(function (tab) {
                selectedTabs.push({
                    title: tab.title,
                    url: tab.url
                });
            });
            callback(newFolder.id, selectedTabs);
        });
    });
}

// create bookmark folder
function createBookmarkFolder(callback) {
    let folderName = document.getElementById('folder_name').value;
    if (folderName === '') {
        folderName = 'Bookmarks';
    }
    chrome.bookmarks.create({ parentId: '1', title: folderName }, function (newFolder) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        callback(newFolder);
    });
}

document.getElementById('addAllTabsToFolder').addEventListener('click', addAllTabsToFolder);
document.getElementById('addSelectedTabsToFolder').addEventListener('click', addSelectedTabsToFolder);

function addAllTabsToFolder() {
    getAllTabs(function (folderId, selectedTabs) {
        addTabsToFolder(folderId, selectedTabs);
    });
}

function addSelectedTabsToFolder() {
    getSelectedTabs(function (folderId, selectedTabs) {
        addTabsToFolder(folderId, selectedTabs);
    });
}

function addTabsToFolder(folderId, tabs) {
    tabs.forEach(function (tab) {
        chrome.bookmarks.create({
            'parentId': folderId,
            'title': tab.title,
            'url': tab.url
        });
    });
}


// language
function loadLanguageFile(language) {
    return fetch(`/lang/${language}.json`)
        .then(response => response.json())
        .then(data => {
            window.languageData = data;
        });
}

// Update laguage content
function updateContent() {
    document.getElementById('folderNameLabel').innerText = window.languageData.folderNameLabel;
    document.getElementById('header').innerText = window.languageData.header;
    document.getElementById('addAllTabsToFolder').innerText = window.languageData.addAllTabsToFolder;
    document.getElementById('addSelectedTabsToFolder').innerText = window.languageData.addSelectedTabsToFolder;
}

// Get the browser language and load the language file
function initMultilingual() {
    const browserLanguage = navigator.language.split('-')[0]; // just the language code, without the country code

    loadLanguageFile(browserLanguage)
        .then(updateContent)
        .catch(() => {
            // if the language file is not found, default to english
            return loadLanguageFile('en').then(updateContent);
        });
}

// Initialize the script
window.addEventListener('DOMContentLoaded', initMultilingual);