import $ from "jquery";

export default async function(url) {
  try {
    const resultPage = await $.ajax({
      dataType: "html",
      method: "GET",
      url: url,
      xhrFields: {
        withCredentials: true
      }
    });

    // find elements
    let childrenNodesForVideoTitle = [
      "div.vm-video-item-content-primary",
      "div.vm-video-info-container",
      "div.vm-video-title",
      "div.vm-video-title-container"
    ];
    let list = $(
      "div.vm-video-side-content-left-container > div.vm-badges > span.vm-scheduled-date.localized-date",
      $(resultPage)
    );

    // collect the scheduled videos metadata
    return $.map(list, function(item) {
      // since old Youtube design isn't going to change soon , it should work on it
      let $videoTitleSelector = childrenNodesForVideoTitle.reduce(
        (currentSelector, node) => currentSelector.children(node),
        $(item).closest("div.vm-video-item-content")
        //.parents().eq(3)
      );
      // an useful object for next usage
      return {
        title: $videoTitleSelector
          .children("a")
          .first()
          .text(),
        time: $(item).attr("data-timestamp"),
        url:
          "https://www.youtube.com/watch?v=" +
          $videoTitleSelector
            .children("a")
            .first()
            .attr("href")
            .replace("/edit?o=U&video_id=", "")
      };
    });
  } catch (e) {
    // Unknown error : maybe network or other
    chrome.runtime.sendMessage({ type: "error", error: e });
    return [];
  }
}
