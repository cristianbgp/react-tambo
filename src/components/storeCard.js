/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import {
  Text,
  Card,
  Line,
  AllDayIcon,
  ATMIcon,
  MapPin
} from "../components/ui";

function StoreCard({ store }) {
  return (
    <Card css={{ margin: "0.7em", width: "initial" }}>
      <Text css={{ fontWeight: "bold" }}>{store.name}</Text>
      <Line />
      <Text>
        {store.distance < 1000
          ? `${parseInt(store.distance)}m`
          : `${(store.distance / 1000).toFixed(2)}km`}
      </Text>
      <Text css={{ textTransform: "capitalize" }}>
        {store.address.toLowerCase()}
      </Text>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <a
          href={`https://maps.google.com/?q=${store.latitude},${store.longitude}`}
          css={{ textDecoration: "none", color: "inherit" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin
            width="67px"
            height="67px"
            css={{
              transition: "color 0.2s ease",
              "&:hover": { color: "#A74A93" }
            }}
          />
        </a>
        {store.allday && <AllDayIcon width="100px" height="100px" />}
        {store.atm && <ATMIcon width="100px" height="100px" />}
      </div>
    </Card>
  );
}

export default StoreCard;
