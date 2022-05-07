import React from "react";
import loading from "../static/images/loading.gif";

const Loading = () => {
  return (
    <div className="loadingContainer">
      <img src={loading} />
    </div>
  );
};

export default Loading;
