// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("button").addEventListener("click", function() {
    chrome.runtime.sendMessage({ type: "ICAL_request" });
  });
  document.querySelector("button").innerHTML = chrome.i18n.getMessage(
    "buttonGenerator"
  );
});
