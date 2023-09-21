// Function to update the UI with the retrieved words
function updateWords(words) {
    const wordOfList = document.getElementById("wordList"); // ul HTML tag
    if (!wordOfList) return;

    // Clear the existing list
    wordOfList.innerHTML = '';

    // Populate the list with the retrieved words
    for (let i = 0; i < words.length; i++) {
        const list = document.createElement('li');
        list.textContent = words[i];
        wordOfList.appendChild(list);
    }
}

// Add a listener to retrieve and update the UI when the content script loads
chrome.storage.local.get({ words: [] }, (result) => {
    const words = result.words || [];
    updateWords(words);
});

// Add your message listener to handle new words (as you already have)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let text = request.text;

    // Check if the message contains the 'text' property
    try {
        if (text !== undefined) {
            const wordOfList = document.getElementById("wordList");
            if (!wordOfList) return;

            // Increment a counter for each word
            if (!wordOfList.dataset.counter) {
                wordOfList.dataset.counter = 1;
            } else {
                wordOfList.dataset.counter++;
            }

            // Create an <li> element and append it to the <ul> element
            const list = document.createElement('li');
            list.textContent = wordOfList.dataset.counter + '-' + text;
            wordOfList.appendChild(list);

            // Save the updated list to chrome.storage.local
            chrome.storage.local.set({ words: Array.from(wordOfList.children).map(li => li.textContent) }, () => {
                console.log(`Updated list saved to storage.`);
            });
        }
    } catch (err) {
        console.log(err);
    }
});
