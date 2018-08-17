// imports
import build_calendar from "./events_to_ical";
import scheduled_videos_extractor from "./extractor";
import scheduled_videos_max_page_index from "./get_max_private_page_index";
import all_videos_max_page_index from "./get_total_page_index";

export default async function(videos_url, private_videos_url) {
  // first , get the maximal page index for scheduled uploads
  let first_estimation = await all_videos_max_page_index(videos_url);
  let final_estimation = await scheduled_videos_max_page_index(
    private_videos_url,
    first_estimation
  );

  console.log("First estimated page index : " + first_estimation);
  console.log("Final estimated page index : " + final_estimation);

  // second, using the estimation, extract data
  let page_indexes_for_scheduled_videos = Array.from(
    new Array(final_estimation),
    (val, index) => index + 1
  );

  let array_of_scheduled_videos = await Promise.all(
    page_indexes_for_scheduled_videos.map(async function(page_index) {
      let result = await scheduled_videos_extractor(
        private_videos_url + page_index
      );
      console.log(private_videos_url + page_index, result);
      return result;
    })
  ).then(array_of_array_of_scheduled_videos =>
    [].concat(...array_of_array_of_scheduled_videos)
  );
  console.log("Data to be sent to ical file : ", array_of_scheduled_videos);
  // build the calendar and then send it for download
  return [build_calendar(array_of_scheduled_videos)];
}
