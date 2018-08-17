import $ from "jquery";
import fetchHTML from "./fetchGetAsyncToDocument";

export default async function(private_videos_url, total_count) {
  try {
    // get total uploaded video count
    const resultPage = await fetchHTML(private_videos_url + total_count);

    // check if we got the "No video were found" message ; a hint that tell us how much real scheduled videos you hold
    if ($(".vm-no-items", $(resultPage)).length) {
      return parseInt(
        $("#vm-pagination > div.yt-uix-pager > a:last", $(resultPage)).attr(
          "data-page"
        ),
        10
      );
    } else {
      // assume all your videos are scheduled (unlikely case) (in my tests, I never got this case )
      return total_count;
    }
  } catch (e) {
    // Unknown error : maybe network or other
    console.log({ type: "error", error: e });
    return 1;
  }
}
