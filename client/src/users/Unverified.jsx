import React from "react";

const Unverified = ({ data }) => {
  console.log(data);
  return (
    <div className="file-desc">
      <div className="center">
        <h4>Title : {data.name}</h4>
        <span className={data.status}>{data.status}</span>
      </div>
    </div>
  );
};

export default Unverified;
