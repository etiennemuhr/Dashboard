/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";

const Error404 = () => {
  return (
    <div
      style={{
        backgroundColor: "lightgrey",
        height: "100vh",
        width: "100vw",
        position: "relative",
        top: "-100px"
      }}
    >
      <div
        style={{
          marginLeft: "100px",
          paddingTop: "150px",
          position: "relative",
          fontSize: "60px"
        }}
      >
        Leider konnten wir diese Seite nicht finden 😢 (ERROR_404...)
        <br />
        Am besten suchst du gleich weiter 🧐
      </div>
    </div>
  );
};

export default Error404;
