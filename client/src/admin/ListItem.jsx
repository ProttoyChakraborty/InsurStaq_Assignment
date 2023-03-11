import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ data }) => {
  console.log(data);
  return (
    <div className="file-desc">
      <div className="center">
        <h4>Title : {data.name}</h4>
        <Link to={`/verify/${data.id}`} style={{textDecoration:"none"}}>
          <button className="submit-button">Verify</button>
          </Link>
      </div>
    </div>
  );
};

export default ListItem;
