/** @jsx jsx */
import React from "react";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Global, jsx } from "@emotion/core";
import Home from "./views/home";

function App() {
  return (
    <>
      <Global
        styles={{
          "body, h1, p": {
            margin: 0,
            fontSize: "30px",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
          }
        }}
      />
      <Home />
    </>
  );
}

console.log("by @cristianbgp 🤓");

const rootElement = document.getElementById("root");
render(<App />, rootElement);

serviceWorker.unregister();
