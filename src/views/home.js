/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Title, Select, LoaderIcon } from "../components/ui";
import StoresList from "../components/storesList";

function Home() {
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

  function handleChangeFilter(e) {
    setSelectedFilter(e.target.value);
  }

  function filterBy(store) {
    if (selectedFilter !== "") {
      return store[selectedFilter];
    } else {
      return true;
    }
  }

  const styleContainer = {
    minHeight: "100vh",
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
      <React.Suspense
        fallback={
          <div
            css={{
              height: 100,
              paddingLeft: 50,
              svg: { height: "100%", circle: { fill: "#A74A93" } }
            }}
          >
            <LoaderIcon />
          </div>
        }
      >
        <StoresList
          filterBy={filterBy}
          currentLocation={[position.latitude, position.longitude]}
        />
      </React.Suspense>
    </div>
  );
}

export default Home;
