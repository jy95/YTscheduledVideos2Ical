export default async function(url) {
  // await response of fetch call
  let response = await fetch(url);
  // only proceed once promise is resolved
  let html = await response.text();
  // Initialize the DOM parser
  let parser = new DOMParser();
  // Parse the text
  return parser.parseFromString(html, "text/html");
}
