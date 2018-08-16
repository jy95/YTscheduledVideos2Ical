export default async function(url) {
  // await response of fetch call
  let response = await fetch(url);
  // only proceed once promise is resolved
  return await response.text();
}
