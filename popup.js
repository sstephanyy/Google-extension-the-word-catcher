
function updateWords(words) {
    const wordOfList = document.getElementById("wordList"); 
    if (!wordOfList) return; //If doesn't exit wordOfList, the function returns early, ensuring that it doesn't throw errors when trying to manipulate a nonexistent element.

    // to ensure that when new words are retrieved and displayed in the UI, they don't accumulate on top of the previously displayed words. Instead, it clears out any previously displayed words within wordOfList before populating it with the newly retrieved words
    wordOfList.innerHTML = '';

    for (let i = 0; i < words.length; i++) {
        const list = document.createElement('li');

        // div to hold the word and link example
        const wordContainer = document.createElement('div');
        wordContainer.className = 'word-container';

        const wordLink = document.createElement('a');
        wordLink.href = `https://www.oxfordlearnersdictionaries.com/us/definition/english/${words[i]}`; 
        wordLink.textContent = words[i];
        wordLink.title = "Click here to see the definition"; // Change the href here

        wordLink.className = 'word-link';

        //event listener to open the link in a new tab
        wordLink.addEventListener('click', function (event) {
            event.preventDefault();
            window.open(wordLink.href, '_blank');
        });

        // Create a span for the counter
        const counterSpan = document.createElement('span');
        counterSpan.textContent = (i + 1) + ' - ';
 

        // Create the "Exemplos..." link
        const exampleLink = document.createElement('a');
        exampleLink.href = `https://www.playphrase.me/#/search?q=${words[i]}`;
        exampleLink.className = 'example-link';
        exampleLink.textContent = " -> " + "Exemplos...";

        //event listener to open the link in a new tab
        exampleLink.addEventListener('click', function (event) {
            window.open(exampleLink.href, '_blank');
        });

        // Create the delete button
        const img = document.createElement('img');
        img.src = './images/delete.png';
        img.className = 'remove-word';

        wordContainer.appendChild(counterSpan);
        wordContainer.appendChild(wordLink);
        wordContainer.appendChild(exampleLink);

        list.appendChild(wordContainer);
        list.appendChild(img);

        //event listener to the delete button
        img.addEventListener('click', function () {
            const wordToRemove = words[i]; // get the current element clicked
            removeWord(wordToRemove);

            const clickSound = document.getElementById('clickSound');
            if (clickSound) {
                clickSound.play();
            }
        });

        // Append the li tag into ul tag
        wordOfList.appendChild(list);
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
