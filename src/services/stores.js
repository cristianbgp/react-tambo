import { apiURL } from "../utils";

async function getStores() {
  const response = await fetch(`${apiURL}/stores`);

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

async function getStoresByDistance(currentLocation) {
  const response = await fetch(
    `${apiURL}/nearest?currentLatitude=${currentLocation[0]}&currentLongitude=${
      currentLocation[1]
    }`
  );

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export { getStores, getStoresByDistance };
