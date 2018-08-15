let vobject = require("vobject");

// https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function timestamp2DateTime(timestamp) {
  return new Date(timestamp * 1000).toISOString();
}

function descriptionText(item, dateItem) {
  return (
    chrome.i18n.getMessage("descriptionItemIcal") +
    " " +
    item.title +
    " ( " +
    item.url +
    " ) " +
    chrome.i18n.getMessage("description2ItemIcal") +
    dateItem.toLocaleString()
  );
}

// add each item to the calendar
export default function(eventArray) {
  let calendar = vobject.calendar();
  var index = eventArray.length;
  while (index--) {
    // create an event
    let event = vobject.event();
    let item = eventArray[index];
    let dateTime = timestamp2DateTime(item.time);

    // set title and description
    event.setSummary(item.title);
    event.setDescription(descriptionText(item, dateTime));

    // since YT use timestamp , I am forced to make an ugly conversion

    // format : YYYY-MM-DDTHH:mm:ssZ (https://github.com/outlook/vobject-js/blob/master/docs/vobject/dateTimeValue.md#dateparsedatetimedatetimestring)
    let dateTimeValue = vobject.dateTimeValue(dateTime.toISOString());
    event.setDTStart(dateTimeValue);

    // add event to calendar
    calendar.pushComponent(event);
  }
  return calendar.toICS();
}
