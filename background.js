// Fetch stored websites from Chrome storage
chrome.storage.local.get(["websites"], (data) => {
    const websites = data.websites || [];
    // console.log(websites);
    const currentTime = new Date().getTime();
  
    websites.forEach((site) => {
      chrome.history.search({ text: site }, (results) => {
        results.forEach((entry) => {
          if (entry.url.includes(site)) {
            chrome.history.deleteUrl({ url: entry.url });
          }
        });
      });
    });
  });