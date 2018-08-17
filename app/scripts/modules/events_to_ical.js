const ical = require("ical-generator");

function descriptionText(item, date) {
  return (
    chrome.i18n.getMessage("descriptionItemIcal") +
    " " +
    item.title +
    " ( " +
    item.url +
    " ) " +
    chrome.i18n.getMessage("description2ItemIcal") +
    // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    new Date(item.time * 1000).toLocaleString()
  );
}

// add each item to the calendar
export default function(eventArray) {
  return ical({
    domain: "youtube.com",
    name: chrome.i18n.getMessage("appName"),
    events: eventArray.map(function(item) {
      let dateItem = new Date(item.time * 1000);
      return {
        summary: item.title,
        description: descriptionText(item, dateItem),
        start: dateItem,
        // add 1 seconds since scheduled uploads doesn't take all day to be public
        end: new Date(dateItem.getTime() + 1000),
        url: item.url
      };
    })
  }).toString();
}
