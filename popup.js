const saveButton = document.getElementById("saveButton");
if (saveButton) {
  saveButton.addEventListener("click", () => {
    console.log("Button clicked!");
  });
} else {
  console.error("Save button not found!");
}

saveButton.addEventListener("click", () => {
    const website = document.getElementById("websiteInput").value;
    chrome.storage.local.get(["websites"], (data) => {
      const websites = data.websites || [];
      websites.push(website);
      chrome.storage.local.set({ websites });
    });
  });

  document.getElementById("cleanHistoryButton").addEventListener("click", () => {
    chrome.storage.local.get(["websites"], (data) => {
      const websites = data.websites || [];
      websites.forEach((site) => {
        chrome.history.search({ text: site }, (results) => {
          results.forEach((entry) => {
            if (entry.url.includes(site)) {
              chrome.history.deleteUrl({ url: entry.url });
            //   console.log("cleared: ", site);
            }
          });
        });
      });
    //   console.log("History cleaned for stored websites.");
    });
  });