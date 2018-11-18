import React from "react";
import spinnerImg from "./spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinnerImg}
        alt=""
        style={{
          width: "100px",
          margin: "auto",
          display: "block"
        }}
      />
    </div>
  );
};
