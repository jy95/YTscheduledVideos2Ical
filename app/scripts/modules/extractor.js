import $ from "jquery";
import fetchHTML from "./fetchGetAsyncToDocument";

const LOOKUP_VARIABLE = "VIDEO_LIST_DISPLAY_OBJECT";

export default async function(url) {
  try {
    console.log(url, " - Extracting scheduled videos");
    const resultPage = await fetchHTML(url);

    // manual testing and I find out that videos data are stored here
    let videoItemsData = $(
      "script:contains('" + LOOKUP_VARIABLE + "')",
      resultPage
    )
      .first()
      .text();
    // If I didn't use a variable to store the match
    // let regex = /"VIDEO_LIST_DISPLAY_OBJECT":(\[{.*}\])/;
    let regex = new RegExp('"' + LOOKUP_VARIABLE + '"' + ":(\\[{.*}\\])");

    let json_stringed_result = regex.exec(videoItemsData);
    if (
      json_stringed_result !== null &&
      json_stringed_result[1] !== undefined
    ) {
      let result = json_stringed_result[1];
      console.log(url, " - Found videoItems contents");
      let videoItems = JSON.parse('{"videosItem":' + result + "}");
      return videoItems["videosItem"]
        .map(function(item) {
          let html = $(item.html);
          return {
            url: "https://www.youtube.com/watch?v=" + item.id,
            time: parseInt(
              $("span.vm-scheduled-date.localized-date", html).attr(
                "data-timestamp"
              ),
              10
            ),
            title: $("a.vm-video-title-content", html).text()
          };
          // just to remove not scheduled videos from result (for example the private video)
        })
        .filter(item => !isNaN(item.time));
    } else {
      // nothing found
      return [];
    }
  } catch (e) {
    // Unknown error : maybe network or other
    chrome.runtime.sendMessage({ type: "error", error: e });
    return [];
  }
}
