/** @jsx jsx */
import { jsx } from "@emotion/core";
import useSWR from "swr";
import { fetcher } from "../utils";
import StoreCard from "../components/storeCard";

function StoresList({ currentLocation, filterBy }) {
  const {
    data: responseStores
  } = useSWR(
    `nearest?currentLatitude=${currentLocation[0]}&currentLongitude=${currentLocation[1]}`,
    fetcher,
    { suspense: true }
  );

  return (
    <div css={{ maxWidth: "800px" }}>
      {responseStores.filter(filterBy).map(store => {
        return <StoreCard key={store.id} store={store} />;
      })}
    </div>
  );
}

export default StoresList;
