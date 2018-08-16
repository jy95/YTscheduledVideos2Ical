import $ from "jquery";
import fetchHTML from "./fetchGetAsync";

const MAX_ITEMS_ON_SINGLE_PAGE = 30;

export default async function(my_videos_url) {
  try {
    // get total uploaded video count
    const resultPage = await fetchHTML(my_videos_url);

    // because Old Youtube contains max 30 items per page, I can extrapolate what is the biggest page index
    let total_count = $("#creator-subheader-item-count", $(resultPage)).text();
    // +1 in order to handle round cases , for example 34 videos takes 2 pages
    return Math.round(parseInt(total_count, 10) / MAX_ITEMS_ON_SINGLE_PAGE) + 1;
  } catch (e) {
    // Unknown error : maybe network or other
    console.log({ type: "error", error: e });
    return 1;
  }
}
