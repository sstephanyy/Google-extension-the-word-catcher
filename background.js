chrome.contextMenus.onClicked.addListener(genericOnClick); //It listens for clicks on context menu items and calls the genericOnClick function when an item is clicked.

function genericOnClick(info) { //The info parameter contains information about the clicked item

      let text = info.selectionText; //Extract the selected text from the info object
      console.log(`Selected text: ${text}`);

      // Send the words for the popup
      chrome.runtime.sendMessage({ text }); //object destructuring -> extract the text property from an object and assign it to a variable with the same name. So, Message is an object with a text property. equivalent to: { text: text }

      // Save the word to chrome.storage -> when use chrome.storage.local to save data, it gets saved locally on the user's machine in a specific storage area dedicated to the extension. On Windows, it's often stored in the user's profile folder
      chrome.storage.local.get(['words'], (result) => { 
      let words = result.words || []; // If the words array doesn't exist in storage (first-time use), it initializes an empty array.
      //adds the newly selected word (text) to the words array. This is how the extension keeps track of all the words that have been saved
      words.push(text);
      chrome.storage.local.set({ words: words }, () => { //updates the words array in local storage with the new word added. 
          console.log(`Word "${text}" saved to storage.`);
      });
  });

};


// This event is triggered when the extension is installed or updated.
chrome.runtime.onInstalled.addListener(function () {
  // Create one test item for each context type.
  let contexts = [
    'page',
    'selection',
    'link',
    'editable',
    'image',
    'video',
    'audio'
  ];
  for (let i = 0; i < contexts.length; i++) {
    let context = contexts[i];
    let title = "Inglesando 😎 - Add word";
    chrome.contextMenus.create({
      title: title,
      contexts: [context],
      id: context,

    });
  }
 });

 