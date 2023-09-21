function updateWords(words) {
    const wordOfList = document.getElementById("wordList"); 
    if (!wordOfList) return; //If doesn't exit wordOfList, the function returns early, ensuring that it doesn't throw errors when trying to manipulate a nonexistent element.

    // to ensure that when new words are retrieved and displayed in the UI, they don't accumulate on top of the previously displayed words. Instead, it clears out any previously displayed words within wordOfList before populating it with the newly retrieved words
    wordOfList.innerHTML = '';

    let counter = 1;

    for (let i = 0; i < words.length; i++) {
        const list = document.createElement('li');
        const img = document.createElement('img');
        img.src = './images/delete.png';
        img.className = 'remove-word';
        list.textContent = (counter++) + ' - ' + words[i];
        wordOfList.appendChild(list); 
        list.appendChild(img);

        img.addEventListener('click', function (){
            const wordToRemove = words[i]; // get the current element clicked
            removeWord(wordToRemove);
        });
    }
}

function removeWord(word) {
    chrome.storage.local.get({ words: [] }, (result) => {
        const words = result.words || [];
        const index = words.indexOf(word); //finds the index of the word to remove within the words array.
        if (index >= 0) {
            words.splice(index, 1); // Remove the word from the array
            //updates the words array in local storage with the modified words array, which no longer contains the removed word
            chrome.storage.local.set({ words: words }, () => {
                console.log(`Word "${word}" removed from storage.`);
                updateWords(words);
            });
        }
    });
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
