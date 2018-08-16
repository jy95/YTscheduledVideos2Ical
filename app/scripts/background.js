import build_result from "./modules/build_result";

// Constants needed
const MY_VIDEO_URL = "https://www.youtube.com/my_videos?o=U";
const PRIVATE_VIDEO_URL =
  "https://www.youtube.com/my_videos?o=U&vmo=private&sq=is%3Aprivate&pi=";

console.log("Hello from background");

// for debugging purposes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "error":
      console.log(message.error);
      break;
    case "ICAL_request":
      build_result(MY_VIDEO_URL, PRIVATE_VIDEO_URL).then(function(calendar) {
        let blob = new Blob(calendar, {
          type: "text/calendar"
        });
        let url = URL.createObjectURL(blob);
        chrome.downloads.download({
          url: url, // The object URL can be used as download URL
          filename: chrome.i18n.getMessage("appShortName") + ".ical" // The filename
        });
      });

      break;
  }
  return true;
});
