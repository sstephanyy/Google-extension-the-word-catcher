chrome.contextMenus.onClicked.addListener(genericOnClick); //It listens for clicks on context menu items and calls the genericOnClick function when an item is clicked.

function genericOnClick(info) {
  let text = info.selectionText;
  console.log(`Selected text: ${text}`);

  // Send the words for the popup
  chrome.runtime.sendMessage({ text });

  // Save the word to chrome.storage
  chrome.storage.local.get(['words'], (result) => {
      let words = result.words || [];
      words.push(text);
      chrome.storage.local.set({ words: words }, () => {
          console.log(`Word "${text}" saved to storage.`);
      });
  });
}




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

 