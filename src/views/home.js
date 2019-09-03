/** @jsx jsx */
import React from "react";
import { getStores, getStoresByDistance } from "../services/stores";
import { jsx } from "@emotion/core";
import { Title, Select } from "../components/ui";
import StoreCard from "../components/storeCard";

function Home() {
  const [stores, setStores] = React.useState([]);
  const [position, setPosition] = React.useState({ latitude: 0, longitude: 0 });
  const [selectedFilter, setSelectedFilter] = React.useState("");

  React.useEffect(() => {
    const watchID = navigator.geolocation.watchPosition(pos => {
      setPosition(pos.coords);
    });
    return () => {
      navigator.geolocation.clearWatch(watchID);
    };
  }, [setPosition]);

  React.useEffect(() => {
    getStoresByDistance([position.latitude, position.longitude]).then(
      stores => {
        setStores(stores);
      }
    );
  }, [setStores, position]);

  function handleChangeFilter(e) {
    setSelectedFilter(e.target.value);
    console.log(e.target.value);
  }

  function filterBy(store) {
    if (selectedFilter !== "") {
      console.log(store);
      return store[selectedFilter];
    } else {
      return true;
    }
  }

  const styleContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#000000",
    backgroundColor: "#fde43b",
    transition: "background-color 0.5s ease"
  };

  if (position.latitude === 0)
    return (
      <div
        css={{
          ...styleContainer,
          justifyContent: "center",
          backgroundColor: "#ffffff",
          color: "#000000",
          height: "100vh"
        }}
      >
        <p css={{ fontSize: "0.8em" }}>Please allow location access</p>
      </div>
    );

  return (
    <div css={styleContainer}>
      <Title css={{ marginTop: "0.7em", color: "#A74A93" }}>Tambo+</Title>
      <Title>cerca</Title>
      <label
        htmlFor="filter-stores"
        css={{ fontSize: "0.7em", textAlign: "center", marginTop: "1em" }}
      >
        Filter by:
        <div css={{ margin: "0.7em" }}>
          <Select
            onChange={handleChangeFilter}
            defaultValue=""
            name="filter-stores"
            id="filter-stores"
          >
            <option value="">None</option>
            <option value="allday">24 hours</option>
            <option value="atm">ATM</option>
          </Select>
        </div>
      </label>
      <div css={{ maxWidth: "800px" }}>
        {stores.filter(filterBy).map(store => {
          return <StoreCard key={store.id} store={store} />;
        })}
      </div>
    </div>
  );
}

export default Home;
