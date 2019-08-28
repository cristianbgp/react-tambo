/** @jsx jsx */
import React from "react";
import { getStores, getStoresByDistance } from "../services/stores";
import { jsx } from "@emotion/core";
import { Title } from "../components/ui";
import StoreCard from "../components/storeCard";

function Home() {
  const [stores, setStores] = React.useState([]);
  const [position, setPosition] = React.useState({ latitude: 0, longitude: 0 });

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
      <div css={{ maxWidth: "800px" }}>
        {stores.map(store => {
          return <StoreCard key={store.id} store={store} />;
        })}
      </div>
    </div>
  );
}

export default Home;
