
export const apiURL = "https://tambo-api.herokuapp.com";

export async function fetcher(path) {
  const response = await fetch(`${apiURL}/${path}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}
