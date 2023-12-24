// Saves options to chrome.storage
const saveOptions = () => {
    const default_folder_name = document.getElementById('default_folder_name').value;

    chrome.storage.sync.set(
        { default_folder_name: default_folder_name },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        { default_folder_name: 'Bookmarks' },
        (items) => {
            document.getElementById('default_folder_name').value = items.default_folder_name;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
if (document.getElementById('save_button'))
    document.getElementById('save_button').addEventListener('click', saveOptions);


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
    document.getElementById('default_folder_name_label').innerText = window.languageData.default_folder_name_label;
    document.getElementById('save_button').innerText = window.languageData.save_button;
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

    // Get the default folder name from chrome storage
    chrome.storage.sync.get(['default_folder_name'], function (result) {
        var defaultFolderName = result.default_folder_name;
        if (document.getElementById('folder_name'))
            document.getElementById('folder_name').value = defaultFolderName;
    });
}

// Initialize the script
window.addEventListener('DOMContentLoaded', initMultilingual);