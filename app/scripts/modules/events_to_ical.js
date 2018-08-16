const ical = require("ical-generator");
const moment = require("moment");

function descriptionText(item) {
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
      let dateItem = moment.unix(item.item);
      return {
        title: item.title,
        description: descriptionText(item),
        start: dateItem,
        end: dateItem.add(1, "s"),
        url: item.url
      };
    })
  }).toString();
}
