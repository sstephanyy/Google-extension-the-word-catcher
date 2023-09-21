function updateWords(words) {
    const wordOfList = document.getElementById("wordList"); 
    if (!wordOfList) return; //If doesn't exit wordOfList, the function returns early, ensuring that it doesn't throw errors when trying to manipulate a nonexistent element.

    // to ensure that when new words are retrieved and displayed in the UI, they don't accumulate on top of the previously displayed words. Instead, it clears out any previously displayed words within wordOfList before populating it with the newly retrieved words
    wordOfList.innerHTML = '';

    let counter = 1;

    for (let i = 0; i < words.length; i++) {
        const list = document.createElement('li');
        list.textContent = counter + ' - ' + words[i];
        wordOfList.appendChild(list); 
        counter++;

    }
}

// Add a listener to retrieve and update the UI when the content script loads
chrome.storage.local.get({ words: [] }, (result) => {
    const words = result.words || [];
    updateWords(words);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let text = request.text;

    try {
        if (text) {
            const wordOfList = document.getElementById("wordList");
            if (!wordOfList) return;

            // Save the updated list to chrome.storage.local
            chrome.storage.local.set({ words: Array.from(wordOfList.children).map(li => li.textContent) }, () => {
                console.log(`Updated list saved to storage.`);
            });
        }
    } catch (err) {
        console.log(err);
    }
});
