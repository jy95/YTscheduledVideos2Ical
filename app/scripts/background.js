// for debugging purposes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "error":
      console.log(message.error);
      break;
    case "ICAL_request":
      break;
  }
  return true;
});
